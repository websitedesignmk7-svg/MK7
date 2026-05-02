const fs = require('fs');
const path = require('path');

const storeDataStr = fs.readFileSync('C:/Users/Mouad/.gemini/antigravity/brain/8bcf5bf4-66bf-4422-aa0d-bfc70a439a02/.system_generated/steps/5/output.txt', 'utf8').split('\n').pop().replace(/^\d+:\s/, '');
const data = JSON.parse(storeDataStr);
const p = data.results.find(r => r.id === '3525cd40-ff68-81dd-afeb-ee030c820462');
const props = p.properties;

const storeName = props['Store name']?.title?.[0]?.plain_text || '';
const phoneRaw = props['Phone number']?.url || '';
const phoneDigits = phoneRaw.replace(/\D/g, '');
const gmaps = props['Google Maps link']?.url || '';
const socialRaw = props['Social Media and gmail and book']?.rich_text?.map(t => t.plain_text).join('') || '';
const hero = props['Hero Page']?.rich_text?.[0]?.plain_text || '';
const menuRaw = props['menu']?.rich_text?.map(t => t.plain_text).join('') || '';
const salonPics = props['Salon pictures ']?.multi_select?.map(o => o.name) || [];

let html = fs.readFileSync('C:/Users/Mouad/Desktop/MK7/index.html', 'utf8');

// Title
html = html.replace('<title> | Premium Grooming</title>', `<title>${storeName} | Premium Grooming</title>`);

// Nav Logo
html = html.replace('<div class="text-2xl font-bold serif tracking-widest uppercase glow-text"> <span class="gold-text">.</span></div>', 
  `<div class="text-2xl font-bold serif tracking-widest uppercase glow-text">${storeName}<span class="gold-text">.</span></div>`);

// WhatsApp links
html = html.replace(/href="https:\/\/wa\.me\/"/g, `href="https://wa.me/${phoneDigits}"`);

// Hero Image
if (hero) {
  html = html.replace(/background-image:\s*url\('[^']+'\);/, `background-image: url('${hero}');`);
}

// Hero Title
html = html.replace('<h1 class="text-5xl md:text-7xl serif mb-8 leading-tight glow-text"></h1>', 
  `<h1 class="text-5xl md:text-7xl serif mb-8 leading-tight glow-text">${storeName}</h1>`);

// Social icons next to WhatsApp in Hero
let socialIcons = `<a href="https://wa.me/${phoneDigits}" target="_blank" class="text-white/60 hover:text-[#25D366] hover:scale-110 transition-all text-2xl"><i class="fab fa-whatsapp"></i></a>`;
if (socialRaw.includes('instagram.com')) {
  const igMatch = socialRaw.match(/https?:\/\/(www\.)?instagram\.com\/[^\s]+/);
  if (igMatch) socialIcons += `\n<a href="${igMatch[0]}" target="_blank" class="text-white/60 hover:text-[#E4405F] hover:scale-110 transition-all text-2xl"><i class="fab fa-instagram"></i></a>`;
}
if (socialRaw.includes('facebook.com')) {
  const fbMatch = socialRaw.match(/https?:\/\/(www\.)?facebook\.com\/[^\s]+/);
  if (fbMatch) socialIcons += `\n<a href="${fbMatch[0]}" target="_blank" class="text-white/60 hover:text-[#1877F2] hover:scale-110 transition-all text-2xl"><i class="fab fa-facebook"></i></a>`;
}
if (socialRaw.includes('booksy.com') || socialRaw.includes('fresha.com')) {
  const bookMatch = socialRaw.match(/https?:\/\/[^\s]+/g)?.find(u => u.includes('booksy') || u.includes('fresha'));
  if (bookMatch) socialIcons += `\n<a href="${bookMatch}" target="_blank" class="text-white/60 hover:text-[#d4af37] hover:scale-110 transition-all text-2xl"><i class="fas fa-calendar-alt"></i></a>`;
}
html = html.replace(/<div class="flex gap-4">[\s\S]*?<\/div>/, `<div class="flex gap-4">\n${socialIcons}\n</div>`);

// Gallery
if (salonPics.length > 0) {
  const carouselHtml = salonPics.map(pic => `<div class="carousel-item"><img src="${pic}" alt="Salon image"></div>`).join('\n');
  html = html.replace(/<div class="carousel-track">[\s\S]*?<\/div>/, `<div class="carousel-track">\n${carouselHtml}\n</div>`);
} else {
  // Original template keeps original images, so do nothing if array is empty
}

// Menu
if (menuRaw) {
  // Simple parser: lines with $ are prices, line before is name.
  const lines = menuRaw.split('\n').map(l => l.trim()).filter(l => l);
  let menuItems = '';
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('$') || /\d/.test(lines[i])) {
      if (lines[i].includes('$') && i > 0 && !lines[i-1].includes('$') && !/\d/.test(lines[i-1])) {
        menuItems += `<div class="menu-item"><span>${lines[i-1]}</span><span class="price-tag-sm">${lines[i]}</span></div>\n`;
      }
    }
  }
  if (menuItems) {
    const newMenuHtml = `
      <div class="grid md:grid-cols-2 gap-12">
        <div class="space-y-12">
          <div class="menu-category-card">
            <h4 class="gold-text serif text-2xl mb-6 border-b border-gold/20 pb-2 flex items-center"><i class="fas fa-cut mr-3 text-sm"></i> Services</h4>
            <div class="space-y-2">
              ${menuItems}
            </div>
          </div>
        </div>
      </div>
    `;
    html = html.replace(/<div class="grid md:grid-cols-2 gap-12">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, newMenuHtml + '\n</div>\n</section>');
  }
}

// Location block
if (phoneRaw) {
  const phoneHtml = `
    <a href="tel:${phoneDigits}" class="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors group">
        <div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-[#d4af37] transition-colors">
            <i class="fas fa-phone text-[#d4af37]"></i>
        </div>
        <div>
            <div class="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Call Us</div>
            <div class="font-bold tracking-wider">${phoneRaw}</div>
        </div>
    </a>
  `;
  html = html.replace('<div class="space-y-6">\r\n                    \r\n                    ', `<div class="space-y-6">\n${phoneHtml}\n`);
}

// Maps iframe
if (gmaps) {
  const q = encodeURIComponent(storeName);
  html = html.replace(/src="https:\/\/maps\.google\.com\/maps\?width=100%25&height=600&hl=en&q=[^&]*&t=&z=15&ie=UTF8&iwloc=B&output=embed"/, 
    `src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${q}&t=&z=15&ie=UTF8&iwloc=B&output=embed"`);
}

// Footer
html = html.replace(/<footer[\s\S]*?<\/footer>/, `
  <footer class="py-12 text-center border-t border-white/5 bg-[#030303]">
      <div class="text-2xl font-bold serif mb-4 tracking-widest uppercase">${storeName}<span class="gold-text">.</span></div>
      <p class="text-gray-600 text-[10px] uppercase tracking-[0.5em]">Premium Grooming Destination</p>
  </footer>
`);

const folderName = storeName.replace(/ /g, '_');
const dirPath = path.join('C:/Users/Mouad/Desktop/MK7', folderName);
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}
fs.writeFileSync(path.join(dirPath, 'index.html'), html);
console.log('Success:', folderName);
