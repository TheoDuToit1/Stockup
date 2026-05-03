import fs from 'fs';

function updateFile(path: string, replacements: [string | RegExp, string][]) {
  if (!fs.existsSync(path)) return;
  let content = fs.readFileSync(path, 'utf-8');
  for (const [search, replace] of replacements) {
    if (typeof search === 'string') {
      content = content.split(search).join(replace);
    } else {
      content = content.replace(search, replace);
    }
  }
  fs.writeFileSync(path, content);
  console.log(`Updated ${path}`);
}

// App.tsx additional cleanup for missed dots or icons
updateFile('src/App.tsx', [
   ['rounded-full animate-pulse', 'rounded-[4px] animate-pulse']
]);

// StockMetricChart.tsx
updateFile('src/components/StockMetricChart.tsx', [
  ['rounded-full border border-white/5', 'rounded-[9px] border border-white/5']
]);

// area-chart.tsx (tooltips / legend badges)
updateFile('src/components/ui/area-chart.tsx', [
  ['rounded-full bg-card', 'rounded-[9px] bg-card']
]);

// cobe-globe-live.tsx
updateFile('src/components/ui/cobe-globe-live.tsx', [
  ['rounded-full border border-white/10', 'rounded-[9px] border border-white/10']
]);

// StockupGlobeHero.tsx (if used or for completeness)
updateFile('src/components/StockupGlobeHero.tsx', [
  ['rounded-full bg-primary/10', 'rounded-[9px] bg-primary/10'],
  ['rounded-full font-black', 'rounded-[9px] font-black']
]);

// StockHero.tsx (check inner dots)
updateFile('src/components/StockHero.tsx', [
  ['rounded-full bg-primary animate-pulse', 'rounded-[4px] bg-primary animate-pulse']
]);
