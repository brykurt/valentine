const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '..', 'dist');

try {
  console.log('Deploying to gh-pages branch...');

  // Check if gh-pages branch exists
  try {
    execSync('git show-ref --verify --quiet refs/heads/gh-pages', { stdio: 'pipe' });
  } catch {
    // Create gh-pages branch if it doesn't exist
    console.log('Creating gh-pages branch...');
    execSync('git checkout --orphan gh-pages', { stdio: 'inherit' });
    execSync('git rm -rf .', { stdio: 'inherit' });
    execSync('git commit --allow-empty -m "Initial gh-pages commit"', { stdio: 'inherit' });
    execSync('git push -u origin gh-pages', { stdio: 'inherit' });
    execSync('git checkout master', { stdio: 'inherit' });
  }

  // Ensure we're on master
  execSync('git checkout master', { stdio: 'inherit' });

  // Copy dist contents to a temp location
  const tempDir = path.join(__dirname, '..', '.temp-gh-pages');
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  fs.mkdirSync(tempDir, { recursive: true });

  // Copy all files from dist to temp
  const distContents = fs.readdirSync(distPath);
  distContents.forEach(file => {
    const srcPath = path.join(distPath, file);
    const destPath = path.join(tempDir, file);
    if (fs.statSync(srcPath).isDirectory()) {
      fs.cpSync(srcPath, destPath, { recursive: true });
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });

  // Switch to gh-pages branch
  execSync('git checkout gh-pages', { stdio: 'inherit' });

  // Remove all files except .git
  const files = fs.readdirSync('.');
  files.forEach(file => {
    if (file !== '.git' && file !== '.temp-gh-pages') {
      const filePath = path.join('.', file);
      if (fs.statSync(filePath).isDirectory()) {
        fs.rmSync(filePath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(filePath);
      }
    }
  });

  // Copy temp files to root
  const tempContents = fs.readdirSync(tempDir);
  tempContents.forEach(file => {
    const srcPath = path.join(tempDir, file);
    const destPath = path.join('.', file);
    if (fs.statSync(srcPath).isDirectory()) {
      fs.cpSync(srcPath, destPath, { recursive: true });
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });

  // Clean up temp
  fs.rmSync(tempDir, { recursive: true, force: true });

  // Commit and push
  execSync('git add -A', { stdio: 'inherit' });
  execSync('git commit -m "Deploy to GitHub Pages"', { stdio: 'inherit' });
  execSync('git push origin gh-pages', { stdio: 'inherit' });

  // Switch back to master
  execSync('git checkout master', { stdio: 'inherit' });

  console.log('✅ Deployment complete!');
} catch (error) {
  console.error('Deployment failed:', error.message);
  // Try to switch back to master on error
  try {
    execSync('git checkout master', { stdio: 'inherit' });
  } catch {}
  process.exit(1);
}
