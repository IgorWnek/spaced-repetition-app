const fs = require('fs');
const path = require('path');

const sourceDir = '.';
const backupDir = 'backups';

// Create backup directory if it doesn't exist
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

// Get current timestamp
const timestamp = new Date().toISOString().replace(/:/g, '-');

// Create a new backup directory with timestamp
const backupPath = path.join(backupDir, timestamp);
fs.mkdirSync(backupPath);

// Function to copy files recursively
function copyRecursive(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursive(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Copy project files to backup directory
fs.readdirSync(sourceDir).forEach(item => {
  if (item !== 'node_modules' && item !== backupDir) {
    copyRecursive(path.join(sourceDir, item), path.join(backupPath, item));
  }
});

console.log(`Backup created at: ${backupPath}`);