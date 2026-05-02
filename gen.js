const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

let newHtml = html.replace(/Barbers Republic co Wynyard/g, 'Exotic barber shop');
newHtml = newHtml.replace(/Barbers Republic/g, 'Exotic barber shop');
newHtml = newHtml.replace(/<span class="gold-text">co.<\/span>/g, '');
newHtml = newHtml.replace(/<span class="gold-text">co Wynyard<\/span>/g, '');

// Hero image
newHtml = newHtml.replace(/https:\/\/lh3.googleusercontent.com\/p\/AF1QipNo1igiHxFKNivFu95fIkGafhNSmFm3SEEqZAT7=s1360-w1360-h1020-rw/g, 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGeiUYyLD3mnQz3DDRAk5LxXrIWmjxxnx7Yqh-Vf1cDD4TRhl-3UZKPwnCGB7aDdOFp7ZxkpdQGThn-PrbAeLRfCAMOJsXMLo99UBM-oBOuSSVOSzZzLBGfVHGIJh-dis-zfdXWGJ9v96OA=s1360-w1360-h1020-rw');

// Images
const images = [
  'https://lh3.googleusercontent.com/gps-cs-s/APNQkAH9f9Zeb7uT5xnOZOd4oet1Nq9tNNdCNWqiHpcF3bmd72qZEbkFzHc9IU81svhmchNnGcs0KJgx_8hOPos4CiFy2ZSgFl88z-IJYX2p5lKvwYYeLAZwYhZz1n-cjZbKLzj8dVUqw7bxWWEq=s1360-w1360-h1020-rw',
  'https://lh3.googleusercontent.com/p/AF1QipNFJjk8YskClRjr3er-ou5RAYAd29wVmtCu3rg=s1360-w1360-h1020-rw',
  'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGjBBqnbMOQVbyJ0Bi4ST_Gm6tgE7mgHZpClwfOjSAZa2_IF9mL7THoe_qVkkL8kkeKYn4tCZ1nMYMAddq0QmaBmOWE1LdN9xgLeT8D2Ey2nTHEvdAvDwwNRF5Q4jjDBWWVk4PA-3KQR7UX=s1360-w1360-h1020-rw',
  'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGeiUYyLD3mnQz3DDRAk5LxXrIWmjxxnx7Yqh-Vf1cDD4TRhl-3UZKPwnCGB7aDdOFp7ZxkpdQGThn-PrbAeLRfCAMOJsXMLo99UBM-oBOuSSVOSzZzLBGfVHGIJh-dis-zfdXWGJ9v96OA=s1360-w1360-h1020-rw',
  'https://lh3.googleusercontent.com/p/AF1QipOMe-wmcl9o4PmFkUVf8qJ9rg7WiZemcJopBho=s1360-w1360-h1020-rw',
  'https://lh3.googleusercontent.com/p/AF1QipNZ5skU9haVGfY5S76ERjpaVubN1r9ELNKUxNo=s1360-w1360-h1020-rw'
];
newHtml = newHtml.replace(/https:\/\/lh3.googleusercontent.com\/p\/AF1QipPcdqyNUucbj1-Jpb377toC4OslD4mBbhxnSwLi=s1360-w1360-h1020-rw/g, images[0]);
newHtml = newHtml.replace(/https:\/\/lh3.googleusercontent.com\/p\/AF1QipPmc3ohZMs7luxrIhGl2ozHQYZ-1_P7qFfE0oxI=s1360-w1360-h1020-rw/g, images[1]);
newHtml = newHtml.replace(/https:\/\/lh3.googleusercontent.com\/p\/AF1QipOfpOBPFG1zKhptuVVMj1y4uhiC1mvIFc79goi9=s1360-w1360-h1020-rw/g, images[2]);
newHtml = newHtml.replace(/https:\/\/lh3.googleusercontent.com\/p\/AF1QipPi2D1BhLKO9Z8xw-VavUwAwKFAMv3hHCc5BJOz=s1360-w1360-h1020-rw/g, images[3]);
newHtml = newHtml.replace(/https:\/\/lh3.googleusercontent.com\/p\/AF1QipP05mow9JmQHgPMTZDsaFwXzmECrqv5WRqKW-i0=s1360-w1360-h1020-rw/g, images[4]);
newHtml = newHtml.replace(/https:\/\/lh3.googleusercontent.com\/p\/AF1QipPoRKVRAA-N4sLMNQwdbOjqUAq_vc9eVNZ1CODG=s1360-w1360-h1020-rw/g, images[5]);

// Phone
newHtml = newHtml.replace(/\+61 451 595 515/g, '+1 907-332-7700');
newHtml = newHtml.replace(/tel:\+61451595515/g, 'tel:+19073327700');
newHtml = newHtml.replace(/61451595515/g, '19073327700');

// Social Media
newHtml = newHtml.replace(/https:\/\/www.instagram.com\/barbersrepublic.co_wynyard\//g, 'https://www.instagram.com/exoticbarbershop_/');
newHtml = newHtml.replace(/https:\/\/www.fresha.com\/lvp\/barbers-republic-co-king-street-sydney-8JXrBV/g, 'https://booksy.com/en-us/729067_exotic-barber-shop_barber-shop_13188_anchorage');

// Google Maps
newHtml = newHtml.replace(/https:\/\/www.google.com\/maps\/place\/Barbers\+Republic\+co\+Wynyard\/@-33.8662247,151.2050532,17z/g, 'https://www.google.com/maps/search/Exotic+barber+shop,+636+E+15th+Ave,+Anchorage,+AK+99501,+United+States');
newHtml = newHtml.replace(/Exotic barber shop, Sydney NSW/g, 'Exotic barber shop, Anchorage AK');
// Remove facebook link
newHtml = newHtml.replace(/<a href="https:\/\/www.facebook.com[^>]*><i class="fab fa-facebook-f"><\/i><\/a>/, '');

// iframe map (replace the iframe source or whole container)
const newIframe = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1889.379515560416!2d-149.8668478!3d61.214434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x56c897cb244e8c5d%3A0xe212cc733d3c75ab!2sExotic%20Barber%20Shop!5e0!3m2!1sen!2sus!4v1713962000000!5m2!1sen!2sus" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
newHtml = newHtml.replace(/<iframe src="https:\/\/www.google.com\/maps\/embed[^>]+><\/iframe>/, newIframe);

// Update Menu
const menuHtml = `
                    <div class="menu-category-card">
                        <h4 class="gold-text serif text-2xl mb-6 border-b border-gold/20 pb-2 flex items-center"><i class="fas fa-cut mr-3 text-sm"></i> Hair Cuts</h4>
                        <div class="space-y-2">
                            <div class="menu-item"><span>Line up +Eyebrows</span><span class="price-tag-sm">$25.00</span></div>
                            <div class="menu-item"><span>Beard maintenance</span><span class="price-tag-sm">$25.00</span></div>
                            <div class="menu-item"><span>Haircuts regular</span><span class="price-tag-sm">$40.00</span></div>
                            <div class="menu-item"><span>Modern cut</span><span class="price-tag-sm">$45.00</span></div>
                            <div class="menu-item"><span>Haircut + beard + hot towel</span><span class="price-tag-sm">$50.00</span></div>
                            <div class="menu-item"><span>Haircut an beard</span><span class="price-tag-sm">$45.00</span></div>
                        </div>
                    </div>
`;
// replace the first column of the menu and clear the second column
newHtml = newHtml.replace(/<div class="grid md:grid-cols-2 gap-12">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, `<div class="grid md:grid-cols-1 gap-12">
                <div class="space-y-12">
${menuHtml}
                </div>
            </div>
        </div>
    </section>`);

if (!fs.existsSync('Exotic_Barber_Shop')) {
    fs.mkdirSync('Exotic_Barber_Shop');
}
fs.writeFileSync('Exotic_Barber_Shop/index.html', newHtml);
console.log('Done!');
