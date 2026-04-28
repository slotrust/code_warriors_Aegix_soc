const fs = require('fs');
const files = fs.readdirSync('./src/components').filter(f => f.endsWith('.tsx'));
files.forEach(f => {
  const path = './src/components/' + f;
  let text = fs.readFileSync(path, 'utf8');
  text = text.replace(/#06B6D4/ig, '#00e5c0');
  text = text.replace(/#A855F7/ig, '#7f77dd');
  text = text.replace(/#0B0D17/ig, '#080b10');
  text = text.replace(/glass-panel/g, 'bg-[#181d28] border border-white/5 rounded-lg');
  fs.writeFileSync(path, text);
});
let appText = fs.readFileSync('./src/App.tsx', 'utf8');
appText = appText.replace(/#06B6D4/ig, '#00e5c0');
appText = appText.replace(/#0B0D17/ig, '#080b10');
fs.writeFileSync('./src/App.tsx', appText);
