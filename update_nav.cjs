const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  "{ label: 'Events', href: '#popup' },",
  "{ label: 'Events', href: '#popup' },\n    { label: 'Brands', href: '#brands' },"
);

fs.writeFileSync('src/App.tsx', content, 'utf8');