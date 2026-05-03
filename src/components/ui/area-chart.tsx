"use client";

import { localPoint } from "@visx/event";
import { curveMonotoneX } from "@visx/curve";
import { GridColumns, GridRows } from "@visx/grid";
import { ParentSize } from "@visx/responsive";
import { scaleLinear, scaleTime, type scaleBand } from "@visx/scale";
import { AreaClosed, LinePath } from "@visx/shape";
import { bisector } from "d3-array";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useSpring,
} from "motion/react";
import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type ReactElement,
  type ReactNode,
  type RefObject,
  type SetStateAction,
} from "react";
import useMeasure from "react-use-measure";
import { createPortal } from "react-dom";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type CurveFactory = any;

type ScaleLinearType<Output, _Input = number> = ReturnType<
  typeof scaleLinear<Output>
>;
type ScaleTimeType<Output, _Input = Date | number> = ReturnType<
  typeof scaleTime<Output>
>;
type ScaleBandType<Domain extends { toString(): string }> = ReturnType<
  typeof scaleBand<Domain>
>;

export const chartCssVars = {
  background: "var(--chart-background)",
  foreground: "var(--chart-foreground)",
  foregroundMuted: "var(--chart-foreground-muted)",
  label: "var(--chart-label)",
  linePrimary: "var(--chart-line-primary)",
  lineSecondary: "var(--chart-line-secondary)",
  crosshair: "var(--chart-crosshair)",
  grid: "var(--chart-grid)",
  indicatorColor: "var(--chart-indicator-color)",
  indicatorSecondaryColor: "var(--chart-indicator-secondary-color)",
  markerBackground: "var(--chart-marker-background)",
  markerBorder: "var(--chart-marker-border)",
  markerForeground: "var(--chart-marker-foreground)",
  badgeBackground: "var(--chart-marker-badge-background)",
  badgeForeground: "var(--chart-marker-badge-foreground)",
  segmentBackground: "var(--chart-segment-background)",
  segmentLine: "var(--chart-segment-line)",
};

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

const DEFAULT_MARGIN: Margin = { top: 40, right: 40, bottom: 40, left: 60 };

export interface TooltipData {
  point: Record<string, unknown>;
  index: number;
  x: number;
  yPositions: Record<string, number>;
  xPositions?: Record<string, number>;
}

export interface LineConfig {
  dataKey: string;
  stroke: string;
  strokeWidth: number;
}

export interface ChartSelection {
  startX: number;
  endX: number;
  startIndex: number;
  endIndex: number;
  active: boolean;
}

export interface ChartContextValue {
  data: Record<string, unknown>[];
  xScale: ScaleTimeType<number, number>;
  yScale: ScaleLinearType<number, number>;
  width: number;
  height: number;
  innerWidth: number;
  innerHeight: number;
  margin: Margin;
  columnWidth: number;
  tooltipData: TooltipData | null;
  setTooltipData: Dispatch<SetStateAction<TooltipData | null>>;
  containerRef: RefObject<HTMLDivElement | null>;
  lines: LineConfig[];
  isLoaded: boolean;
  animationDuration: number;
  xAccessor: (d: Record<string, unknown>) => Date;
  dateLabels: string[];
  selection?: ChartSelection | null;
  clearSelection?: () => void;
  barScale?: ScaleBandType<string>;
  bandWidth?: number;
  hoveredBarIndex?: number | null;
  setHoveredBarIndex?: (index: number | null) => void;
  barXAccessor?: (d: Record<string, unknown>) => string;
  orientation?: "vertical" | "horizontal";
  stacked?: boolean;
  stackOffsets?: Map<number, Map<string, number>>;
}

const ChartContext = createContext<ChartContextValue | null>(null);

function ChartProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: ChartContextValue;
}) {
  return (
    <ChartContext.Provider value={value}>{children}</ChartContext.Provider>
  );
}

function useChart(): ChartContextValue {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error(
      "useChart must be used within a ChartProvider."
    );
  }
  return context;
}

type ScaleTime = ReturnType<typeof scaleTime<number>>;
type ScaleLinear = ReturnType<typeof scaleLinear<number>>;

interface UseChartInteractionParams {
  xScale: ScaleTime;
  yScale: ScaleLinear;
  data: Record<string, unknown>[];
  lines: LineConfig[];
  margin: Margin;
  xAccessor: (d: Record<string, unknown>) => Date;
  bisectDate: (
    data: Record<string, unknown>[],
    date: Date,
    lo: number
  ) => number;
  canInteract: boolean;
}

interface ChartInteractionResult {
  tooltipData: TooltipData | null;
  setTooltipData: Dispatch<SetStateAction<TooltipData | null>>;
  selection: ChartSelection | null;
  clearSelection: () => void;
  interactionHandlers: {
    onMouseMove?: (event: React.MouseEvent<SVGGElement>) => void;
    onMouseLeave?: () => void;
    onMouseDown?: (event: React.MouseEvent<SVGGElement>) => void;
    onMouseUp?: () => void;
    onTouchStart?: (event: React.TouchEvent<SVGGElement>) => void;
    onTouchMove?: (event: React.TouchEvent<SVGGElement>) => void;
    onTouchEnd?: () => void;
  };
  interactionStyle: React.CSSProperties;
}

function useChartInteraction({
  xScale,
  yScale,
  data,
  lines,
  margin,
  xAccessor,
  bisectDate,
  canInteract,
}: UseChartInteractionParams): ChartInteractionResult {
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [selection, setSelection] = useState<ChartSelection | null>(null);

  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef<number>(0);

  const resolveTooltipFromX = useCallback(
    (pixelX: number): TooltipData | null => {
      const x0 = xScale.invert(pixelX);
      const index = bisectDate(data, x0, 1);
      const d0 = data[index - 1];
      const d1 = data[index];

      if (!d0) return null;

      let d = d0;
      let finalIndex = index - 1;
      if (d1) {
        const d0Time = xAccessor(d0).getTime();
        const d1Time = xAccessor(d1).getTime();
        if (x0.getTime() - d0Time > d1Time - x0.getTime()) {
          d = d1;
          finalIndex = index;
        }
      }

      const yPositions: Record<string, number> = {};
      for (const line of lines) {
        const value = d[line.dataKey];
        if (typeof value === "number") {
          yPositions[line.dataKey] = yScale(value) ?? 0;
        }
      }

      return {
        point: d,
        index: finalIndex,
        x: xScale(xAccessor(d)) ?? 0,
        yPositions,
      };
    },
    [xScale, yScale, data, lines, xAccessor, bisectDate]
  );

  const resolveIndexFromX = useCallback(
    (pixelX: number): number => {
      const x0 = xScale.invert(pixelX);
      const index = bisectDate(data, x0, 1);
      const d0 = data[index - 1];
      const d1 = data[index];
      if (!d0) return 0;
      if (d1) {
        const d0Time = xAccessor(d0).getTime();
        const d1Time = xAccessor(d1).getTime();
        if (x0.getTime() - d0Time > d1Time - x0.getTime()) return index;
      }
      return index - 1;
    },
    [xScale, data, xAccessor, bisectDate]
  );

  const getChartX = useCallback(
    (
      event: React.MouseEvent<SVGGElement> | React.TouchEvent<SVGGElement>,
      touchIndex = 0
    ): number | null => {
      let point: { x: number; y: number } | null = null;

      if ("touches" in event) {
        const touch = event.touches[touchIndex];
        if (!touch) return null;
        const svg = event.currentTarget.ownerSVGElement;
        if (!svg) return null;
        point = localPoint(svg, touch as unknown as MouseEvent);
      } else {
        point = localPoint(event);
      }

      if (!point) return null;
      return point.x - margin.left;
    },
    [margin.left]
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<SVGGElement>) => {
      const chartX = getChartX(event);
      if (chartX === null) return;

      if (isDraggingRef.current) {
        const startX = Math.min(dragStartXRef.current, chartX);
        const endX = Math.max(dragStartXRef.current, chartX);
        setSelection({
          startX,
          endX,
          startIndex: resolveIndexFromX(startX),
          endIndex: resolveIndexFromX(endX),
          active: true,
        });
        return;
      }

      const tooltip = resolveTooltipFromX(chartX);
      if (tooltip) setTooltipData(tooltip);
    },
    [getChartX, resolveTooltipFromX, resolveIndexFromX]
  );

  const handleMouseLeave = useCallback(() => {
    setTooltipData(null);
    if (isDraggingRef.current) isDraggingRef.current = false;
    setSelection(null);
  }, []);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<SVGGElement>) => {
      const chartX = getChartX(event);
      if (chartX === null) return;
      isDraggingRef.current = true;
      dragStartXRef.current = chartX;
      setTooltipData(null);
      setSelection(null);
    },
    [getChartX]
  );

  const handleMouseUp = useCallback(() => {
    if (isDraggingRef.current) isDraggingRef.current = false;
    setSelection(null);
  }, []);

  const handleTouchStart = useCallback(
    (event: React.TouchEvent<SVGGElement>) => {
      if (event.touches.length === 1) {
        event.preventDefault();
        const chartX = getChartX(event, 0);
        if (chartX === null) return;
        const tooltip = resolveTooltipFromX(chartX);
        if (tooltip) setTooltipData(tooltip);
      } else if (event.touches.length === 2) {
        event.preventDefault();
        setTooltipData(null);
        const x0 = getChartX(event, 0);
        const x1 = getChartX(event, 1);
        if (x0 === null || x1 === null) return;
        const startX = Math.min(x0, x1);
        const endX = Math.max(x0, x1);
        setSelection({
          startX,
          endX,
          startIndex: resolveIndexFromX(startX),
          endIndex: resolveIndexFromX(endX),
          active: true,
        });
      }
    },
    [getChartX, resolveTooltipFromX, resolveIndexFromX]
  );

  const handleTouchMove = useCallback(
    (event: React.TouchEvent<SVGGElement>) => {
      if (event.touches.length === 1) {
        event.preventDefault();
        const chartX = getChartX(event, 0);
        if (chartX === null) return;
        const tooltip = resolveTooltipFromX(chartX);
        if (tooltip) setTooltipData(tooltip);
      } else if (event.touches.length === 2) {
        event.preventDefault();
        const x0 = getChartX(event, 0);
        const x1 = getChartX(event, 1);
        if (x0 === null || x1 === null) return;
        const startX = Math.min(x0, x1);
        const endX = Math.max(x0, x1);
        setSelection({
          startX,
          endX,
          startIndex: resolveIndexFromX(startX),
          endIndex: resolveIndexFromX(endX),
          active: true,
        });
      }
    },
    [getChartX, resolveTooltipFromX, resolveIndexFromX]
  );

  const handleTouchEnd = useCallback(() => {
    setTooltipData(null);
    setSelection(null);
  }, []);

  const clearSelection = useCallback(() => {
    setSelection(null);
  }, []);

  const interactionHandlers = canInteract
    ? {
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
      }
    : {};

  const interactionStyle: React.CSSProperties = {
    cursor: canInteract ? "crosshair" : "default",
    touchAction: "none",
  };

  return {
    tooltipData,
    setTooltipData,
    selection,
    clearSelection,
    interactionHandlers,
    interactionStyle,
  };
}

const TICKER_ITEM_HEIGHT = 24;

interface DateTickerProps {
  currentIndex: number;
  labels: string[];
  visible: boolean;
}

function DateTicker({ currentIndex, labels, visible }: DateTickerProps) {
  const parsedLabels = useMemo(() => {
    return labels.map((label) => {
      const parts = label.split(" ");
      const month = parts[0] || "";
      const day = parts[1] || "";
      return { month, day, full: label };
    });
  }, [labels]);

  const monthIndices = useMemo(() => {
    const uniqueMonths: string[] = [];
    const indices: number[] = [];

    parsedLabels.forEach((label, index) => {
      if (uniqueMonths.length === 0 || uniqueMonths.at(-1) !== label.month) {
        uniqueMonths.push(label.month);
        indices.push(index);
      }
    });

    return { uniqueMonths, indices };
  }, [parsedLabels]);

  const currentMonthIndex = useMemo(() => {
    if (currentIndex < 0 || currentIndex >= parsedLabels.length) return 0;
    const currentMonth = parsedLabels[currentIndex]?.month;
    return monthIndices.uniqueMonths.indexOf(currentMonth || "");
  }, [currentIndex, parsedLabels, monthIndices]);

  const prevMonthIndexRef = useRef(-1);

  const dayY = useSpring(0, { stiffness: 400, damping: 35 });
  const monthY = useSpring(0, { stiffness: 400, damping: 35 });

  useEffect(() => {
    dayY.set(-currentIndex * TICKER_ITEM_HEIGHT);
  }, [currentIndex, dayY]);

  useEffect(() => {
    if (currentMonthIndex >= 0) {
      const isFirstRender = prevMonthIndexRef.current === -1;
      const monthChanged = prevMonthIndexRef.current !== currentMonthIndex;
      if (isFirstRender || monthChanged) {
        monthY.set(-currentMonthIndex * TICKER_ITEM_HEIGHT);
        prevMonthIndexRef.current = currentMonthIndex;
      }
    }
  }, [currentMonthIndex, monthY]);

  if (!visible || labels.length === 0) return null;

  return (
    <motion.div
      className="overflow-hidden rounded-[9px] bg-card px-4 py-1 text-text border border-white/10 shadow-lg"
      layout
      transition={{
        layout: { type: "spring", stiffness: 400, damping: 35 },
      }}
    >
      <div className="relative h-6 overflow-hidden">
        <div className="flex items-center justify-center gap-1">
          <div className="relative h-6 overflow-hidden">
            <motion.div className="flex flex-col" style={{ y: monthY }}>
              {monthIndices.uniqueMonths.map((month) => (
                <div className="flex h-6 shrink-0 items-center justify-center" key={month}>
                  <span className="whitespace-nowrap font-medium text-sm">{month}</span>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="relative h-6 overflow-hidden">
            <motion.div className="flex flex-col" style={{ y: dayY }}>
              {parsedLabels.map((label, index) => (
                <div className="flex h-6 shrink-0 items-center justify-center" key={`${label.day}-${index}`}>
                  <span className="whitespace-nowrap font-medium text-sm">{label.day}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface TooltipDotProps {
  x: number;
  y: number;
  visible: boolean;
  color: string;
  size?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

function TooltipDot({
  x,
  y,
  visible,
  color,
  size = 5,
  strokeColor = chartCssVars.background,
  strokeWidth = 2,
}: TooltipDotProps) {
  const animatedX = useSpring(x, { stiffness: 300, damping: 30 });
  const animatedY = useSpring(y, { stiffness: 300, damping: 30 });

  useEffect(() => {
    animatedX.set(x);
    animatedY.set(y);
  }, [x, y, animatedX, animatedY]);

  if (!visible) return null;

  return (
    <motion.circle
      cx={animatedX}
      cy={animatedY}
      fill={color}
      r={size}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
    />
  );
}

type IndicatorWidth = number | "line" | "thin" | "medium" | "thick";

interface TooltipIndicatorProps {
  x: number;
  height: number;
  visible: boolean;
  width?: IndicatorWidth;
  span?: number;
  columnWidth?: number;
  colorEdge?: string;
  colorMid?: string;
  fadeEdges?: boolean;
  gradientId?: string;
}

function resolveWidth(width: IndicatorWidth): number {
  if (typeof width === "number") return width;
  switch (width) {
    case "line": return 1;
    case "thin": return 2;
    case "medium": return 4;
    case "thick": return 8;
    default: return 1;
  }
}

function TooltipIndicator({
  x,
  height,
  visible,
  width = "line",
  span,
  columnWidth,
  colorEdge = chartCssVars.crosshair,
  colorMid = chartCssVars.crosshair,
  fadeEdges = true,
  gradientId = "tooltip-indicator-gradient",
}: TooltipIndicatorProps) {
  const pixelWidth = span !== undefined && columnWidth !== undefined ? span * columnWidth : resolveWidth(width);
  const animatedX = useSpring(x - pixelWidth / 2, { stiffness: 300, damping: 30 });

  useEffect(() => {
    animatedX.set(x - pixelWidth / 2);
  }, [x, animatedX, pixelWidth]);

  if (!visible) return null;

  const edgeOpacity = fadeEdges ? 0 : 1;

  return (
    <g>
      <defs>
        <linearGradient id={gradientId} x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: colorEdge, stopOpacity: edgeOpacity }} />
          <stop offset="10%" style={{ stopColor: colorEdge, stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: colorMid, stopOpacity: 1 }} />
          <stop offset="90%" style={{ stopColor: colorEdge, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: colorEdge, stopOpacity: edgeOpacity }} />
        </linearGradient>
      </defs>
      <motion.rect fill={`url(#${gradientId})`} height={height} width={pixelWidth} x={animatedX} y={0} />
    </g>
  );
}

export interface TooltipRow {
  color: string;
  label: string;
  value: string | number;
}

interface TooltipContentProps {
  title?: string;
  rows: TooltipRow[];
  children?: ReactNode;
}

function TooltipContent({ title, rows, children }: TooltipContentProps) {
  const [measureRef, bounds] = useMeasure({ debounce: 0 });
  const [committedHeight, setCommittedHeight] = useState<number | null>(null);
  const committedChildrenStateRef = useRef<boolean | null>(null);

  const hasChildren = !!children;
  useEffect(() => {
    if (bounds.height <= 0) return;
    setCommittedHeight(bounds.height);
    committedChildrenStateRef.current = hasChildren;
  }, [bounds.height, hasChildren]);

  return (
    <motion.div
      animate={committedHeight !== null ? { height: committedHeight } : undefined}
      className="overflow-hidden"
      initial={false}
      transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.8 }}
    >
      <div className="px-3 py-2.5" ref={measureRef}>
        {title && <div className="mb-2 font-medium text-chart-tooltip-foreground text-xs">{title}</div>}
        <div className="space-y-1.5">
          {rows.map((row) => (
            <div className="flex items-center justify-between gap-4" key={`${row.label}-${row.color}`}>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: row.color }} />
                <span className="text-chart-tooltip-muted text-sm">{row.label}</span>
              </div>
              <span className="font-medium text-chart-tooltip-foreground text-sm tabular-nums">
                {typeof row.value === "number" ? row.value.toLocaleString() : row.value}
              </span>
            </div>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {children && (
            <motion.div animate={{ opacity: 1 }} className="mt-2" exit={{ opacity: 0 }} initial={{ opacity: 0 }}>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

interface TooltipBoxProps {
  x: number;
  y: number;
  visible: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
  containerWidth: number;
  containerHeight: number;
  offset?: number;
  className?: string;
  children: ReactNode;
  left?: number | ReturnType<typeof useSpring>;
  top?: number | ReturnType<typeof useSpring>;
  flipped?: boolean;
}

function TooltipBox({
  x,
  y,
  visible,
  containerRef,
  containerWidth,
  containerHeight,
  offset = 16,
  className = "",
  children,
  left: leftOverride,
  top: topOverride,
  flipped: flippedOverride,
}: TooltipBoxProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipWidth, setTooltipWidth] = useState(180);
  const [tooltipHeight, setTooltipHeight] = useState(80);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useLayoutEffect(() => {
    if (tooltipRef.current) {
      setTooltipWidth(tooltipRef.current.offsetWidth);
      setTooltipHeight(tooltipRef.current.offsetHeight);
    }
  });

  const shouldFlipX = x + tooltipWidth + offset > containerWidth;
  const targetX = shouldFlipX ? x - offset - tooltipWidth : x + offset;
  const targetY = Math.max(offset, Math.min(y - tooltipHeight / 2, containerHeight - tooltipHeight - offset));

  const animatedLeft = useSpring(targetX, { stiffness: 100, damping: 20 });
  const animatedTop = useSpring(targetY, { stiffness: 100, damping: 20 });

  useEffect(() => { animatedLeft.set(targetX); }, [targetX, animatedLeft]);
  useEffect(() => { animatedTop.set(targetY); }, [targetY, animatedTop]);

  const finalLeft = leftOverride ?? animatedLeft;
  const finalTop = topOverride ?? animatedTop;
  const isFlipped = flippedOverride ?? shouldFlipX;

  const container = containerRef.current;
  if (!mounted || !container || !visible) return null;

  return createPortal(
    <motion.div
      animate={{ opacity: 1 }}
      className={cn("pointer-events-none absolute z-50", className)}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      ref={tooltipRef}
      style={{ left: finalLeft, top: finalTop }}
    >
      <motion.div
        animate={{ scale: 1, opacity: 1 }}
        className="min-w-[140px] overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-lg backdrop-blur-md"
        initial={{ scale: 0.85, opacity: 0 }}
        style={{ transformOrigin: isFlipped ? "right top" : "left top" }}
      >
        {children}
      </motion.div>
    </motion.div>,
    container
  );
}

export interface ChartTooltipProps {
  showDatePill?: boolean;
  showCrosshair?: boolean;
  showDots?: boolean;
  content?: (props: { point: Record<string, unknown>; index: number }) => ReactNode;
  rows?: (point: Record<string, unknown>) => TooltipRow[];
  children?: ReactNode;
  className?: string;
}

export function ChartTooltip({
  showDatePill = true,
  showCrosshair = true,
  showDots = true,
  content,
  rows: rowsRenderer,
  children,
  className = "",
}: ChartTooltipProps) {
  const {
    tooltipData,
    width,
    height,
    innerHeight,
    margin,
    columnWidth,
    lines,
    xAccessor,
    dateLabels,
    containerRef,
    orientation,
    barXAccessor,
  } = useChart();

  const isHorizontal = orientation === "horizontal";
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const visible = tooltipData !== null;
  const x = tooltipData?.x ?? 0;
  const xWithMargin = x + margin.left;
  const yWithMargin = (lines[0] ? (tooltipData?.yPositions[lines[0].dataKey] ?? 0) : 0) + margin.top;

  const animatedX = useSpring(xWithMargin, { stiffness: 300, damping: 30 });
  useEffect(() => { animatedX.set(xWithMargin); }, [xWithMargin, animatedX]);

  const tooltipRows = useMemo(() => {
    if (!tooltipData) return [];
    if (rowsRenderer) return rowsRenderer(tooltipData.point);
    return lines.map((line) => ({
      color: line.stroke,
      label: line.dataKey,
      value: (tooltipData.point[line.dataKey] as number) ?? 0,
    }));
  }, [tooltipData, lines, rowsRenderer]);

  const title = useMemo(() => {
    if (!tooltipData) return undefined;
    if (barXAccessor) return barXAccessor(tooltipData.point);
    return xAccessor(tooltipData.point).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  }, [tooltipData, barXAccessor, xAccessor]);

  if (!mounted || !containerRef.current) return null;

  return createPortal(
    <>
      {showCrosshair && (
        <svg className="pointer-events-none absolute inset-0" height="100%" width="100%">
          <g transform={`translate(${margin.left},${margin.top})`}>
            <TooltipIndicator columnWidth={columnWidth} height={innerHeight} visible={visible} x={x} />
          </g>
        </svg>
      )}
      {showDots && visible && !isHorizontal && (
        <svg className="pointer-events-none absolute inset-0" height="100%" width="100%">
          <g transform={`translate(${margin.left},${margin.top})`}>
            {lines.map((line) => (
              <TooltipDot color={line.stroke} key={line.dataKey} visible={visible} x={tooltipData?.xPositions?.[line.dataKey] ?? x} y={tooltipData?.yPositions[line.dataKey] ?? 0} />
            ))}
          </g>
        </svg>
      )}
      <TooltipBox containerHeight={height} containerRef={containerRef} containerWidth={width} top={isHorizontal ? undefined : margin.top} visible={visible} x={xWithMargin} y={isHorizontal ? yWithMargin : margin.top} className={className}>
        {content ? content({ point: tooltipData?.point ?? {}, index: tooltipData?.index ?? 0 }) : <TooltipContent rows={tooltipRows} title={title}>{children}</TooltipContent>}
      </TooltipBox>
      {showDatePill && dateLabels.length > 0 && visible && !isHorizontal && (
        <motion.div className="pointer-events-none absolute z-50" style={{ left: animatedX, transform: "translateX(-50%)", bottom: 4 }}>
          <DateTicker currentIndex={tooltipData?.index ?? 0} labels={dateLabels} visible={visible} />
        </motion.div>
      )}
    </>,
    containerRef.current
  );
}

export interface GridProps {
  horizontal?: boolean;
  vertical?: boolean;
  numTicksRows?: number;
  numTicksColumns?: number;
  rowTickValues?: number[];
  stroke?: string;
  strokeOpacity?: number;
  strokeWidth?: number;
  strokeDasharray?: string;
  fadeHorizontal?: boolean;
  fadeVertical?: boolean;
}

export function Grid({
  horizontal = true,
  vertical = false,
  numTicksRows = 5,
  numTicksColumns = 10,
  rowTickValues,
  stroke = chartCssVars.grid,
  strokeOpacity = 1,
  strokeWidth = 1,
  strokeDasharray = "4,4",
  fadeHorizontal = true,
  fadeVertical = false,
}: GridProps) {
  const { xScale, yScale, innerWidth, innerHeight, orientation, barScale } = useChart();
  const columnScale = orientation === "horizontal" && barScale ? yScale : xScale;
  const uniqueId = useId();

  return (
    <g className="chart-grid">
      {horizontal && fadeHorizontal && (
        <defs>
          <linearGradient id={`grid-rows-fade-${uniqueId}-gradient`} x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" style={{ stopColor: "white", stopOpacity: 0 }} />
            <stop offset="10%" style={{ stopColor: "white", stopOpacity: 1 }} />
            <stop offset="90%" style={{ stopColor: "white", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "white", stopOpacity: 0 }} />
          </linearGradient>
          <mask id={`grid-rows-fade-${uniqueId}`}><rect fill={`url(#grid-rows-fade-${uniqueId}-gradient)`} height={innerHeight} width={innerWidth} x="0" y="0" /></mask>
        </defs>
      )}
      {horizontal && (
        <g mask={fadeHorizontal ? `url(#grid-rows-fade-${uniqueId})` : undefined}>
          <GridRows numTicks={rowTickValues ? undefined : numTicksRows} scale={yScale} stroke={stroke} strokeDasharray={strokeDasharray} strokeOpacity={strokeOpacity} strokeWidth={strokeWidth} tickValues={rowTickValues} width={innerWidth} />
        </g>
      )}
      {vertical && columnScale && (
        <GridColumns height={innerHeight} numTicks={numTicksColumns} scale={columnScale} stroke={stroke} strokeDasharray={strokeDasharray} strokeOpacity={strokeOpacity} strokeWidth={strokeWidth} />
      )}
    </g>
  );
}

export interface XAxisProps { numTicks?: number; tickerHalfWidth?: number; }

function XAxisLabel({ label, x, crosshairX, isHovering, tickerHalfWidth }: { label: string; x: number; crosshairX: number | null; isHovering: boolean; tickerHalfWidth: number }) {
  const fadeBuffer = 20;
  const fadeRadius = tickerHalfWidth + fadeBuffer;
  let opacity = 1;
  if (isHovering && crosshairX !== null) {
    const distance = Math.abs(x - crosshairX);
    if (distance < tickerHalfWidth) opacity = 0;
    else if (distance < fadeRadius) opacity = (distance - tickerHalfWidth) / fadeBuffer;
  }
  return (
    <div className="absolute" style={{ left: x, bottom: 12, width: 0, display: "flex", justifyContent: "center" }}>
      <motion.span animate={{ opacity }} className="whitespace-nowrap text-chart-label text-xs">{label}</motion.span>
    </div>
  );
}

export function XAxis({ numTicks = 5, tickerHalfWidth = 50 }: XAxisProps) {
  const { xScale, margin, tooltipData, containerRef } = useChart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const labelsToShow = useMemo(() => {
    const domain = xScale.domain();
    if (!domain[0] || !domain[1]) return [];
    const startTime = domain[0].getTime();
    const endTime = domain[1].getTime();
    const timeRange = endTime - startTime;
    const tickCount = Math.max(2, numTicks);
    return Array.from({ length: tickCount }, (_, i) => {
      const date = new Date(startTime + (i / (tickCount - 1)) * timeRange);
      return { date, x: (xScale(date) ?? 0) + margin.left, label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }) };
    });
  }, [xScale, margin.left, numTicks]);

  if (!mounted || !containerRef.current) return null;

  return createPortal(
    <div className="pointer-events-none absolute inset-0">
      {labelsToShow.map((item) => (
        <XAxisLabel key={`${item.label}-${item.x}`} label={item.label} x={item.x} crosshairX={tooltipData ? tooltipData.x + margin.left : null} isHovering={tooltipData !== null} tickerHalfWidth={tickerHalfWidth} />
      ))}
    </div>,
    containerRef.current
  );
}

export interface YAxisProps { numTicks?: number; formatValue?: (value: number) => string; }

export function YAxis({ numTicks = 5, formatValue }: YAxisProps) {
  const { yScale, margin, containerRef } = useChart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const ticks = useMemo(() => {
    const [min, max] = yScale.domain() as [number, number];
    const step = (max - min) / (numTicks - 1);
    return Array.from({ length: numTicks }, (_, i) => {
      const value = min + step * i;
      return { value, y: (yScale(value) ?? 0) + margin.top, label: formatValue ? formatValue(value) : value >= 1000 ? `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k` : value.toLocaleString() };
    });
  }, [yScale, margin.top, numTicks, formatValue]);

  if (!mounted || !containerRef.current) return null;

  return createPortal(
    <div className="pointer-events-none absolute inset-0">
      {ticks.map((tick) => (
        <div key={tick.value} className="absolute" style={{ left: 0, top: tick.y, width: margin.left - 8, display: "flex", justifyContent: "flex-end", transform: "translateY(-50%)" }}>
          <span className="whitespace-nowrap text-chart-label text-xs tabular-nums">{tick.label}</span>
        </div>
      ))}
    </div>,
    containerRef.current
  );
}

export interface AreaProps {
  dataKey: string;
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
  curve?: CurveFactory;
  animate?: boolean;
  showLine?: boolean;
  showHighlight?: boolean;
  gradientToOpacity?: number;
  fadeEdges?: boolean;
}

export function Area({
  dataKey,
  fill = chartCssVars.linePrimary,
  fillOpacity = 0.4,
  stroke,
  strokeWidth = 2,
  curve = curveMonotoneX,
  animate = true,
  showLine = true,
  showHighlight = true,
  gradientToOpacity = 0,
  fadeEdges = false,
}: AreaProps) {
  const { data, xScale, yScale, innerHeight, innerWidth, tooltipData, selection, isLoaded, animationDuration, xAccessor } = useChart();
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) setPathLength(pathRef.current.getTotalLength());
  }, [data]);

  const findLengthAtX = useCallback((targetX: number): number => {
    const path = pathRef.current;
    if (!path || pathLength === 0) return 0;
    let low = 0, high = pathLength;
    while (high - low > 0.5) {
      const mid = (low + high) / 2;
      if (path.getPointAtLength(mid).x < targetX) low = mid; else high = mid;
    }
    return (low + high) / 2;
  }, [pathLength]);

  const segmentBounds = useMemo(() => {
    if (!pathRef.current || pathLength === 0) return { startLength: 0, segmentLength: 0, isActive: false };
    if (selection?.active) {
      const s = findLengthAtX(selection.startX), e = findLengthAtX(selection.endX);
      return { startLength: s, segmentLength: e - s, isActive: true };
    }
    if (!tooltipData) return { startLength: 0, segmentLength: 0, isActive: false };
    const idx = tooltipData.index;
    const startX = xScale(xAccessor(data[Math.max(0, idx - 1)])) ?? 0;
    const endX = xScale(xAccessor(data[Math.min(data.length - 1, idx + 1)])) ?? 0;
    const s = findLengthAtX(startX), e = findLengthAtX(endX);
    return { startLength: s, segmentLength: e - s, isActive: true };
  }, [tooltipData, selection, data, xScale, pathLength, xAccessor, findLengthAtX]);

  const offsetSpring = useSpring(-segmentBounds.startLength, { stiffness: 180, damping: 28 });
  const segmentLengthSpring = useSpring(segmentBounds.segmentLength, { stiffness: 180, damping: 28 });
  const strokeDasharray = useMotionTemplate`${segmentLengthSpring} ${pathLength}`;

  useEffect(() => { offsetSpring.set(-segmentBounds.startLength); segmentLengthSpring.set(segmentBounds.segmentLength); }, [segmentBounds, offsetSpring, segmentLengthSpring]);

  const resolvedStroke = stroke || fill;

  return (
    <>
      <defs>
        <linearGradient id={`area-gradient-${dataKey}`} x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: fill, stopOpacity: fillOpacity }} />
          <stop offset="100%" style={{ stopColor: fill, stopOpacity: gradientToOpacity }} />
        </linearGradient>
      </defs>
      <motion.g animate={{ opacity: tooltipData && showHighlight ? 0.6 : 1 }}>
        <AreaClosed curve={curve} data={data} fill={`url(#area-gradient-${dataKey})`} x={(d) => xScale(xAccessor(d)) ?? 0} y={(d) => typeof d[dataKey] === "number" ? yScale(d[dataKey] as number) ?? 0 : 0} yScale={yScale} />
        {showLine && <LinePath curve={curve} data={data} innerRef={pathRef} stroke={resolvedStroke} strokeWidth={strokeWidth} x={(d) => xScale(xAccessor(d)) ?? 0} y={(d) => typeof d[dataKey] === "number" ? yScale(d[dataKey] as number) ?? 0 : 0} />}
      </motion.g>
      {showHighlight && showLine && tooltipData && isLoaded && pathRef.current && (
        <motion.path d={pathRef.current.getAttribute("d") || ""} fill="none" stroke={resolvedStroke} strokeWidth={strokeWidth} style={{ strokeDasharray, strokeDashoffset: offsetSpring }} />
      )}
    </>
  );
}

export interface AreaChartProps {
  data: Record<string, unknown>[];
  xDataKey?: string;
  margin?: Partial<Margin>;
  animationDuration?: number;
  aspectRatio?: string;
  className?: string;
  children: ReactNode;
}

function ChartInner({
  width, height, data, xDataKey, margin, animationDuration, children, containerRef,
}: { width: number; height: number; data: Record<string, unknown>[]; xDataKey: string; margin: Margin; animationDuration: number; children: ReactNode; containerRef: RefObject<HTMLDivElement | null>; }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const lines = useMemo(() => extractAreaConfigs(children), [children]);
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const xAccessor = useCallback((d: Record<string, unknown>): Date => {
    const value = d[xDataKey]; return value instanceof Date ? value : new Date(value as string | number);
  }, [xDataKey]);
  const bisectDate = useMemo(() => bisector<Record<string, unknown>, Date>((d) => xAccessor(d)).left, [xAccessor]);
  const xScale = useMemo(() => {
    const dates = data.map((d) => xAccessor(d));
    return scaleTime({ range: [0, innerWidth], domain: [Math.min(...dates.map(d => d.getTime())), Math.max(...dates.map(d => d.getTime()))] });
  }, [innerWidth, data, xAccessor]);
  const yScale = useMemo(() => {
    let max = 0; for (const l of lines) for (const d of data) if (typeof d[l.dataKey] === "number" && (d[l.dataKey] as number) > max) max = d[l.dataKey] as number;
    return scaleLinear({ range: [innerHeight, 0], domain: [0, (max || 100) * 1.1], nice: true });
  }, [innerHeight, data, lines]);

  useEffect(() => { const t = setTimeout(() => setIsLoaded(true), animationDuration); return () => clearTimeout(t); }, [animationDuration]);

  const interaction = useChartInteraction({ xScale, yScale, data, lines, margin, xAccessor, bisectDate, canInteract: isLoaded });

  const contextValue = {
    data, xScale, yScale, width, height, innerWidth, innerHeight, margin,
    columnWidth: data.length < 2 ? 0 : innerWidth / (data.length - 1),
    tooltipData: interaction.tooltipData, setTooltipData: interaction.setTooltipData, containerRef, lines, isLoaded, animationDuration, xAccessor,
    dateLabels: data.map(d => xAccessor(d).toLocaleDateString("en-US", { month: "short", day: "numeric" })),
    selection: interaction.selection, clearSelection: interaction.clearSelection,
  };

  return (
    <ChartProvider value={contextValue}>
      <svg height={height} width={width}>
        <g {...interaction.interactionHandlers} style={interaction.interactionStyle} transform={`translate(${margin.left},${margin.top})`}>
          <rect fill="transparent" height={innerHeight} width={innerWidth} />
          {children}
        </g>
      </svg>
    </ChartProvider>
  );
}

function extractAreaConfigs(children: ReactNode): LineConfig[] {
  const configs: LineConfig[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && (child.type === Area)) {
      const props = child.props as any;
      configs.push({
        dataKey: props.dataKey,
        stroke: props.stroke || props.fill || "var(--chart-line-primary)",
        strokeWidth: props.strokeWidth || 2,
      });
    }
  });
  return configs;
}

export function AreaChart({
  data, xDataKey = "date", margin: marginProp, animationDuration = 1100, aspectRatio = "2 / 1", className = "", children,
}: AreaChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const margin = { ...DEFAULT_MARGIN, ...marginProp };
  return (
    <div className={cn("relative w-full", className)} ref={containerRef} style={{ aspectRatio, touchAction: "none" }}>
      <ParentSize debounceTime={10}>
        {({ width, height }) => (
          <ChartInner animationDuration={animationDuration} containerRef={containerRef} data={data} height={height} margin={margin} width={width} xDataKey={xDataKey}>
            {children}
          </ChartInner>
        )}
      </ParentSize>
    </div>
  );
}

export default AreaChart;
