from PIL import Image
import os

INPUT_FILE = "1st story.png"

img = Image.open(INPUT_FILE)

w, h = img.size

cols = 3
rows = 2

panel_w = w // cols
panel_h = h // rows

os.makedirs("output", exist_ok=True)

n = 1

for r in range(rows):
    for c in range(cols):

        left = c * panel_w
        upper = r * panel_h

        right = (c + 1) * panel_w if c < cols - 1 else w
        lower = (r + 1) * panel_h if r < rows - 1 else h

        panel = img.crop((left, upper, right, lower))

        out = f"output/story-panel-{n}.png"

        panel.save(out)

        print(f"Saved: {out}")

        n += 1