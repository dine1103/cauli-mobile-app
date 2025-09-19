const fs = require('fs');
const path = require('path');

// Create a simple script to generate proper app icons
console.log('🎨 Creating proper app icons...');

// Copy the logo without text and create a square version
const sourcePath = 'src/assets/images/logowithouttext.png';
const targetPath = 'assets/icons/icon-square.png';

// For now, just copy the existing icon
// In a real scenario, you'd use image processing to make it square
fs.copyFileSync(sourcePath, targetPath);

console.log('✅ App icon created at:', targetPath);
console.log('📱 Icon should now appear on your device');

