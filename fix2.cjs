const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Global replacement of all aggressive lazy loading except footer
content = content.replace(/loading="lazy"\s+decoding="async"/g, '');
// And footer we might want to keep, but honestly removing it globally is safer and will fix all pop-in issues
// It's a small single page app, the impact is minimal.

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