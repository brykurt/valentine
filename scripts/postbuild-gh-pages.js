const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');
const indexPath = path.join(docsDir, 'index.html');
const notFoundPath = path.join(docsDir, '404.html');
const noJekyllPath = path.join(docsDir, '.nojekyll');

if (!fs.existsSync(indexPath)) {
  console.error('index.html not found. Run the GitHub Pages build first.');
  process.exit(1);
}

fs.copyFileSync(indexPath, notFoundPath);
fs.writeFileSync(noJekyllPath, '');

console.log('GitHub Pages artifacts ready: 404.html and .nojekyll');
