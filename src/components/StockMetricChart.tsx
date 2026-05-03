"use client";

import React from "react";
import {
  AreaChart,
  Area,
  Grid,
  XAxis,
  ChartTooltip,
} from "./ui/area-chart";

const chartData = [
  { date: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), orders: 450, traders: 120 },
  { date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000), orders: 480, traders: 125 },
  { date: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000), orders: 520, traders: 130 },
  { date: new Date(Date.now() - 26 * 24 * 60 * 60 * 1000), orders: 490, traders: 128 },
  { date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), orders: 550, traders: 140 },
  { date: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000), orders: 600, traders: 145 },
  { date: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000), orders: 630, traders: 152 },
  { date: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000), orders: 580, traders: 148 },
  { date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), orders: 610, traders: 155 },
  { date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), orders: 640, traders: 160 },
  { date: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000), orders: 700, traders: 172 },
  { date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000), orders: 750, traders: 180 },
  { date: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000), orders: 720, traders: 178 },
  { date: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000), orders: 680, traders: 170 },
  { date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), orders: 740, traders: 185 },
  { date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), orders: 810, traders: 205 },
  { date: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000), orders: 790, traders: 198 },
  { date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), orders: 850, traders: 215 },
  { date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000), orders: 920, traders: 230 },
  { date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), orders: 880, traders: 222 },
  { date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), orders: 950, traders: 240 },
  { date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), orders: 1050, traders: 265 },
  { date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), orders: 1100, traders: 280 },
  { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), orders: 1020, traders: 260 },
  { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), orders: 1150, traders: 295 },
  { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), orders: 1250, traders: 320 },
  { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), orders: 1180, traders: 305 },
  { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), orders: 1350, traders: 345 },
  { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), orders: 1420, traders: 360 },
  { date: new Date(), orders: 1550, traders: 382 },
];

export default function StockMetricChart() {
  return (
    <div className="w-full bg-card/50 p-6 md:p-12 rounded-[32px] border border-white/5 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <div className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2">Platform Performance</div>
          <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-text leading-none">
            SCALING <br />RETAIL DATA.
          </h3>
        </div>
        <div className="flex gap-8">
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">Total Orders</div>
            <div className="text-2xl font-black text-text italic">1.5k+</div>
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">Active Traders</div>
            <div className="text-2xl font-black text-text italic">382</div>
          </div>
        </div>
      </div>

      <div className="h-[300px] md:h-[400px] w-full">
        <AreaChart data={chartData} className="w-full h-full" aspectRatio="auto">
          <Grid horizontal stroke="rgba(255,255,255,0.05)" />
          <Area
            dataKey="orders"
            stroke="#2563EB"
            fill="#2563EB"
            fillOpacity={0.15}
            strokeWidth={3}
          />
          <Area
            dataKey="traders"
            stroke="rgba(255,255,255,0.2)"
            fill="rgba(255,255,255,0.1)"
            fillOpacity={0.05}
            strokeWidth={2}
          />
          <XAxis numTicks={6} />
          <ChartTooltip
            className="bg-zinc-950 border-white/10"
            rows={(point) => [
              {
                color: "#2563EB",
                label: "Daily Orders",
                value: `${(point.orders as number)?.toLocaleString()}`,
              },
              {
                color: "rgba(255,255,255,0.4)",
                label: "Active Traders",
                value: `${(point.traders as number)?.toLocaleString()}`,
              },
            ]}
          />
        </AreaChart>
      </div>
      
      <div className="mt-12 flex flex-wrap gap-4">
         <div className="px-4 py-2 bg-white/5 rounded-[9px] border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400">
           Real-time Sync Active
         </div>
         <div className="px-4 py-2 bg-white/5 rounded-[9px] border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400">
           99.9% Uptime Verified
         </div>
      </div>
    </div>
  );
}
