const fs = require('fs');
const path = require('path');

const outputArg = process.argv[2];
const outputDir = outputArg
  ? path.resolve(process.cwd(), outputArg)
  : path.join(__dirname, '..', 'dist', 'will-you-be-my-valentine');
const indexPath = path.join(outputDir, 'index.html');
const notFoundPath = path.join(outputDir, '404.html');
const noJekyllPath = path.join(outputDir, '.nojekyll');

if (!fs.existsSync(indexPath)) {
  console.error('index.html not found. Run the GitHub Pages build first.');
  process.exit(1);
}

fs.copyFileSync(indexPath, notFoundPath);
fs.writeFileSync(noJekyllPath, '');

console.log(`GitHub Pages artifacts ready in ${outputDir}`);
