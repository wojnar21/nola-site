const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace standard 'dalej' buttons:
code = code.replaceAll('tracking-[0.2em] pl-[0.2em] uppercase">dalej</span>', 'uppercase">dalej</span>');

// Replace titles:
code = code.replaceAll('tracking-wide pl-[0.025em] block"', 'block"');

fs.writeFileSync('src/App.tsx', code);
