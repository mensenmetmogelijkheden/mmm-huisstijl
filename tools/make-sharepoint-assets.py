"""Generate the images for the SharePoint page templates from tokens.json.

Writes to integrations/sharepoint/paginasjablonen/:
- mmm-kleurkop-indigo.png: the colour header (indigo, with floating blocks in the free space
  above and next to the title). Indigo itself is left out, because it disappears on indigo;
  purple uses paars-licht for the same reason.
- mmm-merkstrip.png: the brand strip, the six logo colours in logo order.

Requires Pillow (pip install pillow).
"""
import json
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
TOKENS = json.loads((ROOT / "skills" / "mmm-huisstijl" / "tokens" / "tokens.json").read_text(encoding="utf-8"))
OUT = ROOT / "integrations" / "sharepoint" / "paginasjablonen"
COLOR = {t["name"]: t["value"] for t in TOKENS["color"]["tokens"] if isinstance(t["value"], str)}

SCALE = 4  # draw at 4x and scale down for smooth edges

# The title sits bottom left; SharePoint crops the image to roughly 4.5:1 on a wide screen.
# Keep the blocks in the upper part, right of centre, so they never sit under the title.
HEADER_SIZE = (2400, 560)
# (centre x, centre y, size, colour token, rotation in degrees between -6 and +8)
FLOATING_BLOCKS = [
    (1330, 150, 72, "rood", -6),  # red slightly smaller, as in the house style
    (1520, 265, 86, "blauw", 5),
    (1700, 125, 86, "geel", -3),
    (1860, 285, 86, "groen", 8),
    (2060, 165, 86, "paars-licht", -5),
]
BLOCK_RADIUS = 6  # 3px at the size the header is shown

STRIP_SIZE = (1800, 12)
STRIP_COLORS = ["rood", "blauw", "indigo", "geel", "groen", "paars"]


def header():
    width, height = HEADER_SIZE
    img = Image.new("RGB", (width * SCALE, height * SCALE), COLOR["indigo"])
    for cx, cy, size, token, rotation in FLOATING_BLOCKS:
        side = int(size * 1.6 * SCALE)
        block = Image.new("RGBA", (side, side), (0, 0, 0, 0))
        offset = (side - size * SCALE) // 2
        ImageDraw.Draw(block).rounded_rectangle(
            [offset, offset, offset + size * SCALE, offset + size * SCALE],
            radius=BLOCK_RADIUS * SCALE,
            fill=COLOR[token],
        )
        # PIL rotates counter-clockwise; negate so the angles match CSS and the browser canvas.
        block = block.rotate(-rotation, resample=Image.BICUBIC)
        img.paste(block, (int(cx * SCALE - side / 2), int(cy * SCALE - side / 2)), block)
    return img.resize(HEADER_SIZE, Image.LANCZOS)


def strip():
    width, height = STRIP_SIZE
    img = Image.new("RGB", STRIP_SIZE)
    draw = ImageDraw.Draw(img)
    part = width // len(STRIP_COLORS)
    for i, token in enumerate(STRIP_COLORS):
        draw.rectangle([i * part, 0, (i + 1) * part - 1, height - 1], fill=COLOR[token])
    return img


OUT.mkdir(parents=True, exist_ok=True)
header().save(OUT / "mmm-kleurkop-indigo.png", optimize=True)
strip().save(OUT / "mmm-merkstrip.png", optimize=True)
print("Written to", OUT.relative_to(ROOT))
