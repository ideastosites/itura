import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await processDirectory(fullPath);
    } else if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.png')) {
      if (file.toLowerCase().endsWith('.webp')) continue;

      const outputFilename = path.parse(file).name + '.webp';
      const outputPath = path.join(dir, outputFilename);

      console.log(`Converting ${file} -> ${outputFilename}...`);
      try {
        await sharp(fullPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
          
        console.log(`Successfully converted ${file}.`);
        fs.unlinkSync(fullPath);
      } catch (e) {
        console.error(`Failed to convert ${file}`, e);
      }
    }
  }
}

async function run() {
  console.log('Starting full public directory WebP conversion...');
  await processDirectory(PUBLIC_DIR);
  console.log('Optimization complete!');
}

run().catch(console.error);
