import os
import re
import time
import requests
from duckduckgo_search import DDGS

# Paths
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
data_file = os.path.join(base_dir, "src", "lib", "marketplace-data.ts")
images_dir = os.path.join(base_dir, "public", "images", "marketplace")

os.makedirs(images_dir, exist_ok=True)

with open(data_file, "r") as f:
    content = f.read()

# Pattern to find items
# matches: id, slug, title, ... and the full block up to imageUrl
# Since it's typescript, we can use regex to find the blocks:
# { \s* id: "h001", \s* slug: "vuren-balk-63x175-4m", \s* title: "Vuren balk 63×175 – 4.2m", ... imageUrl: "..." \s* },
# A safer way is to find all slugs and titles, then replace imageUrl specifically.
pattern = re.compile(r'slug:\s*"([^"]+)", \s* title:\s*"([^"]+)",', re.VERBOSE)

matches = list(pattern.finditer(content))
print(f"Found {len(matches)} items to process.")

ddgs = DDGS()

def download_image(url, save_path):
    try:
        response = requests.get(url, timeout=10, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"})
        if response.status_code == 200:
            # check content type
            if 'image' in response.headers.get('Content-Type', ''):
                with open(save_path, "wb") as f:
                    f.write(response.content)
                return True
    except Exception as e:
        pass
    return False

processed_slugs = []

for match in matches:
    slug = match.group(1)
    title = match.group(2)
    
    # Let's search for this title
    # For better results we add keywords like 'materiaal' or 'bouwmateriaal'
    search_query = f"{title} materiaal bouw"
    print(f"Processing {title} (slug: {slug})")
    
    save_path = os.path.join(images_dir, f"{slug}.jpg")
    image_url_str = f'"/images/marketplace/{slug}.jpg"'
    
    # Only download if it doesn't exist
    if not os.path.exists(save_path):
        try:
            results = ddgs.images(search_query, max_results=5)
            success = False
            for res in results:
                url = res.get('image')
                if not url: continue
                if download_image(url, save_path):
                    print(f"  [+] Downloaded: {url}")
                    success = True
                    break
            
            if not success:
                print(f"  [-] Failed to download any image for {slug}.")
        except Exception as e:
            print(f"  [!] Search error for {slug}: {e}")
            
        time.sleep(2) # rate limit prevention
    else:
        print(f"  [.] Image already exists for {slug}.")
        
    # Now replace in content
    # We find the block for this slug, and replace its imageUrl
    # Regex to find the block for this slug:
    block_pattern = re.compile(r'(slug:\s*"' + re.escape(slug) + r'".*?imageUrl:\s*)([^,]+)', re.DOTALL)
    
    # Wait, the block pattern might match too much if we are not careful.
    # We can replace the first occurrence of imageUrl after the slug.
    def repl(m):
        return m.group(1) + image_url_str
        
    content = block_pattern.sub(repl, content)

with open(data_file, "w") as f:
    f.write(content)

print("Finished processing. marketplace-data.ts has been updated.")
