const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const mappings = [
  { match: "name: 'Cute-Saint'", image: '/Brand_images/Itura brands 1.png' },
  { match: "name: 'Studio Lola'", image: '/Brand_images/Itura brands 2.png' },
  { match: "name: 'AfroWema'", image: '/Brand_images/Itura brands 3.png' },
  { match: "name: 'Isaleekofromderin'", image: '/Brand_images/Itura brands 4.png' },
  { match: "name: 'RENIKEJI'", image: '/Brand_images/Itura brands 5.png' },
  { match: "name: 'Austine Mali'", image: '/Brand_images/Itura brands 6.png' },
  { match: "founder: 'Samira Bello'", image: '/Brand_images/Itura brands 7.png' }, // Aadun
  { match: "name: 'NoahbyWMA'", image: '/Brand_images/Itura brands 8.png' },
  { match: "name: 'DESTOM'", image: '/Brand_images/Itura brands 9.png' },
  { match: "name: 'LOHIJE'", image: '/Brand_images/Itura brands 10.png' },
  { match: "founder: 'Adeitan Fisher'", image: '/Brand_images/Itura brands 11.png' }, // Maadan
  { match: "name: 'FIA'", image: '/Brand_images/Itura brands 12.png' },
  { match: "name: 'Maliko'", image: '/Brand_images/Itura brands 13.png' },
  { match: "name: 'Jacques Logoh'", image: '/Brand_images/Itura brands 14.png' },
  { match: "name: 'Ruru'", image: '/Brand_images/Itura brands 15.png' },
  { match: "name: \"O'saunders\"", image: '/Brand_images/Itura brands 16.png' },
  { match: "name: 'Izoduuwa'", image: '/Brand_images/Itura brands 17.png' },
  { match: "name: 'Vicy and Lawrence'", image: '/Brand_images/Itura brands 18.png' },
  { match: "name: 'Dear Ketandu'", image: '/Brand_images/Itura brands 19.png' }
];

let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('image: null }')) {
    for (let m of mappings) {
      if (lines[i].includes(m.match)) {
        lines[i] = lines[i].replace('image: null }', `image: '${m.image}' }`);
        break;
      }
    }
  }
}

fs.writeFileSync('src/App.tsx', lines.join('\n'), 'utf8');
console.log('Images applied.');