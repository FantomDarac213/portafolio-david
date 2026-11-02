const fs = require('node:fs');
const path = require('node:path');
const icons = require('simple-icons');
const root = path.resolve(__dirname, '..');
const vendor = path.join(root, 'assets/vendor');
const iconDir = path.join(root, 'assets/icons');
fs.mkdirSync(vendor, { recursive: true });
fs.mkdirSync(iconDir, { recursive: true });
for (const file of ['gsap.min.js', 'ScrollTrigger.min.js']) {
  fs.copyFileSync(path.join(root, 'node_modules/gsap/dist', file), path.join(vendor, file));
}
fs.copyFileSync(path.join(root, 'node_modules/gsap/README.md'), path.join(vendor, 'GSAP-README.md'));
fs.copyFileSync(path.join(root, 'node_modules/simple-icons/LICENSE.md'), path.join(iconDir, 'LICENSE.md'));
const names = ['Javascript', 'Typescript', 'Php', 'Html5', 'Css', 'Vuedotjs', 'Nuxt', 'Tailwindcss', 'Laravel', 'Postgresql', 'Redis', 'Docker', 'Git', 'Githubactions', 'Vitest', 'Vite', 'Gsap'];
const credits = names.map(name => {
  const icon = icons['si' + name];
  if (!icon) throw new Error('Icono no encontrado: ' + name);
  fs.writeFileSync(path.join(iconDir, icon.slug + '.svg'), icon.svg.replace('<svg ', '<svg fill="#' + icon.hex + '" '));
  return { name: icon.title, source: icon.source, license: icon.license || null };
});
fs.writeFileSync(path.join(iconDir, 'sources.json'), JSON.stringify(credits, null, 2));
console.log('GSAP, ScrollTrigger y 17 iconos preparados para uso local.');
