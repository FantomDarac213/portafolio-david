const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
fs.mkdirSync(output, { recursive: true });
for (const file of ['index.html', 'fonts.css', 'portfolio.css', 'editorial.css', 'experience.css', 'portfolio.js', 'contact-utils.js', 'interactions.js', 'assets']) {
  fs.cpSync(path.join(root, file), path.join(output, file), { recursive: true });
}
console.log('Sitio estático preparado en dist/');
