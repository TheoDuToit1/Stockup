import fs from 'fs';
const path = 'src/App.tsx';
let content = fs.readFileSync(path, 'utf-8');

// Fix accidental global replacement in Reality of Chaos description
content = content.replace(
  'Fragmented sales channels like POP CULTURE voice notes',
  'Fragmented sales channels like WhatsApp voice notes'
);

fs.writeFileSync(path, content);
console.log('App.tsx content fixed');
