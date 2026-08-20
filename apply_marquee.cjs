const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add import if missing
if (!content.includes("DraggableMarquee")) {
  content = content.replace("import { Menu, X, ArrowRight, ArrowLeft } from 'lucide-react';", "import { Menu, X, ArrowRight, ArrowLeft } from 'lucide-react';\nimport DraggableMarquee from './components/DraggableMarquee';");
}

// Replace top marquee
content = content.replace(/<div className="relative w-full overflow-hidden">[\s\S]*?<style>\{\`@keyframes marquee-slow[\s\S]*?<\/div>\s*<\/div>/, 
`<DraggableMarquee speed={1.2} direction="left">
            {brands.map((brand, idx) => (
              <button key={\`top-\${idx}\`} onClick={() => setSelectedBrand(brand)} className="flex-shrink-0 mx-4 px-8 py-6 group focus:outline-none hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 rounded-sm">
                <span className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white/50 group-hover:text-white transition-colors duration-300 whitespace-nowrap tracking-wide">{brand.name}</span>
              </button>
            ))}
        </DraggableMarquee>`);

// Replace bottom marquee
content = content.replace(/<div className="relative w-full overflow-hidden mt-8">[\s\S]*?<style>\{\`@keyframes marquee-r-slow[\s\S]*?<\/div>\s*<\/div>/,
`<div className="mt-8">
          <DraggableMarquee speed={1.2} direction="right">
            {brands.map((brand, idx) => (
              <button key={\`bot-\${idx}\`} onClick={() => setSelectedBrand(brand)} className="flex-shrink-0 mx-4 px-8 py-6 group focus:outline-none hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 rounded-sm">
                <span className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white/50 group-hover:text-white transition-colors duration-300 whitespace-nowrap tracking-wide">{brand.name}</span>
              </button>
            ))}
          </DraggableMarquee>
        </div>`);

fs.writeFileSync('src/App.tsx', content, 'utf8');