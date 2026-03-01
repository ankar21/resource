const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const baseDir = path.resolve(__dirname, '..');
const dataFile = path.join(baseDir, 'src', 'lib', 'marketplace-data.ts');
const imagesDir = path.join(baseDir, 'public', 'images', 'marketplace');

if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

let content = fs.readFileSync(dataFile, 'utf8');

const pattern = /slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",/g;
const matches = [...content.matchAll(pattern)];

console.log(`Found ${matches.length} items to process.`);

async function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

async function run() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Stealth-like features to avoid blocks
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
    });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    for (const match of matches) {
        const slug = match[1];
        const title = match[2];

        const savePath = path.join(imagesDir, `${slug}.jpg`);
        const imageUrlStr = `"/images/marketplace/${slug}.jpg"`;

        console.log(`Processing ${title} (slug: ${slug})`);

        if (!fs.existsSync(savePath)) {
            const query = encodeURIComponent(`${title} bouw of materiaal`);
            try {
                // DuckDuckGo Images
                await page.goto(`https://duckduckgo.com/?q=${query}&iax=images&ia=images`, { waitUntil: 'domcontentloaded' });
                await delay(2000); // wait for images to load

                // Find first image
                const imgUrl = await page.evaluate(() => {
                    const img = document.querySelector('img.tile--img__img');
                    return img ? img.src : null;
                });

                if (imgUrl) {
                    if (imgUrl.startsWith('data:image')) {
                        // Extract base64 and save
                        const base64Data = imgUrl.replace(/^data:image\/[^;]+;base64,/, "");
                        fs.writeFileSync(savePath, base64Data, 'base64');
                        console.log(`  [+] Saved base64 image.`);
                    } else if (imgUrl.startsWith('http')) {
                        // Normally duckduckgo returns a transparent pixel or a small thumbnail as base64 or a real URL.
                        // For the thumb, it's often a URL to duckduckgo proxy
                        const viewSource = await page.goto(imgUrl);
                        const buffer = await viewSource.buffer();
                        fs.writeFileSync(savePath, buffer);
                        console.log(`  [+] Downloaded from URL.`);
                    }
                } else {
                    console.log(`  [-] No image found for ${slug}`);
                }
            } catch (err) {
                console.log(`  [!] Error processing ${slug}: ${err.message}`);
            }
        } else {
            console.log(`  [.] Image already exists for ${slug}`);
        }

        // Replace in content
        // We find the block for this slug, and replace its imageUrl
        // To be safe, we just use regex replacement for that specific slug
        const regex = new RegExp(`(slug:\\s*"${slug}"[\\s\\S]*?imageUrl:\\s*)([^,]+)`, '');
        content = content.replace(regex, `$1${imageUrlStr}`);
    }

    await browser.close();

    fs.writeFileSync(dataFile, content, 'utf8');
    console.log('Finished updating marketplace-data.ts');
}

run().catch(console.error);
