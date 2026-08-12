import fs from 'fs';
import path from 'path';

const SRC_DIR = path.join(process.cwd(), 'src');

function processFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processFiles(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Update extensions
      content = content.replace(/\.jpg/g, '.webp');
      content = content.replace(/\.jpeg/g, '.webp');
      
      // Add lazy loading to images (excluding those that might already have it)
      // and exclude the hero map in App.tsx
      content = content.replace(/<img(?!.*loading=)/g, '<img loading="lazy" decoding="async"');
      
      // We know heroSlides in App.tsx should NOT be lazy-loaded
      if (file === 'App.tsx') {
        content = content.replace(
          /{heroSlides\.map\(\(slide, idx\) => \(\s*<img loading="lazy" decoding="async"/g,
          '{heroSlides.map((slide, idx) => (\\n          <img'
        );
      }
      
      fs.writeFileSync(fullPath, content);
      console.log(`Updated ${file}`);
    }
  }
}

processFiles(SRC_DIR);
