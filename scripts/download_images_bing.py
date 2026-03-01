import os
import re
import time
import requests
from bs4 import BeautifulSoup
import urllib.parse
import json

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
data_file = os.path.join(base_dir, "src", "lib", "marketplace-data.ts")
images_dir = os.path.join(base_dir, "public", "images", "marketplace")

os.makedirs(images_dir, exist_ok=True)

with open(data_file, "r", encoding="utf-8") as f:
    content = f.read()

pattern = re.compile(r'slug:\s*"([^"]+)", \s* title:\s*"([^"]+)",', re.VERBOSE)
matches = list(pattern.finditer(content))
print(f"Found {len(matches)} items to process.")

def get_bing_image(query):
    url = f"https://www.bing.com/images/search?q={urllib.parse.quote(query)}&form=HDRSC3"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5"
    }
    
    try:
        html = requests.get(url, headers=headers, timeout=10).text
        soup = BeautifulSoup(html, 'html.parser')
        
        items = soup.find_all('a', class_='iusc')
        for item in items:
            try:
                m_data = json.loads(item.get('m', '{}'))
                img_url = m_data.get('murl')
                if img_url and img_url.startswith('http') and not img_url.endswith('.svg') and not img_url.endswith('.gif'):
                    return img_url
            except:
                continue
    except Exception as e:
        print(f"Error scraping Bing: {e}")
    return None

def download_image(url, save_path):
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        }
        res = requests.get(url, headers=headers, timeout=10)
        if res.status_code == 200:
            content_type = res.headers.get('Content-Type', '')
            if 'image' in content_type and 'svg' not in content_type:
                with open(save_path, "wb") as f:
                    f.write(res.content)
                return True
    except:
        pass
    return False

for match in matches:
    slug = match.group(1)
    title = match.group(2)
    search_query = f"{title}"
    
    print(f"Processing {title} (slug: {slug})")
    
    save_path = os.path.join(images_dir, f"{slug}.jpg")
    image_url_str = f'"/images/marketplace/{slug}.jpg"'
    
    if not os.path.exists(save_path):
        img_url = get_bing_image(search_query)
        # fallback query if first one returns nothing
        if not img_url:
            img_url = get_bing_image(f"{title} materiaal bouw")
        
        if img_url:
            if download_image(img_url, save_path):
                print(f"  [+] Downloaded from {img_url}")
            else:
                print(f"  [-] Failed to download from {img_url}")
        else:
            print(f"  [-] No image found for {slug}")
        time.sleep(1)
    else:
        print(f"  [.] Image already exists for {slug}")
    
    block_pattern = re.compile(r'(slug:\s*"' + re.escape(slug) + r'".*?imageUrl:\s*)([^,]+)', re.DOTALL)
    def repl(m):
        return m.group(1) + image_url_str
    
    content = block_pattern.sub(repl, content)

with open(data_file, "w", encoding="utf-8") as f:
    f.write(content)

print("Updates finished!")
