const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(/<img loading="lazy" decoding="async"[\s\S]*?src=\{slide\.img\}[\s\S]*?alt={Paris Campaign/g, '<img\n                src={slide.img}\n                alt={Paris Campaign');

content = content.replace(/<img loading="lazy" decoding="async"[\s\S]*?src=\{slide\.img\}[\s\S]*?alt={Paris Cocktail/g, '<img\n                src={slide.img}\n                alt={Paris Cocktail');

content = content.replace(/<img loading="lazy" decoding="async"[\s\S]*?src="\/second section\.webp"/g, '<img\n                  src="/second section.webp"');

content = content.replace('id="brands" className="py-20 sm:py-28 bg-[#0A0A0A]', 'id="brands" className="pt-20 sm:pt-28 pb-4 sm:pb-8 bg-[#0A0A0A]');

content = content.replace(
    'className="pt-20 sm:pt-28 pb-10 sm:pb-16 bg-[#0A0A0A] overflow-hidden">\n        <div className="max-w-[1400px]', 
    'className="pt-8 sm:pt-12 pb-10 sm:pb-16 bg-[#0A0A0A] overflow-hidden">\n        <div className="max-w-[1400px]'
);
content = content.replace(
    'className="pt-20 sm:pt-28 pb-10 sm:pb-16 bg-[#0A0A0A] overflow-hidden">\r\n        <div className="max-w-[1400px]', 
    'className="pt-8 sm:pt-12 pb-10 sm:pb-16 bg-[#0A0A0A] overflow-hidden">\r\n        <div className="max-w-[1400px]'
);

fs.writeFileSync('src/App.tsx', content, 'utf8');