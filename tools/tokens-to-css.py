"""Generate skills/mmm-huisstijl/tokens/tokens.css from tokens.json.

The first theme (light) goes into :root. Other themes go under [data-theme="<id>"];
the dark theme also under [data-bs-theme="dark"] (the dark mode of the MMM-Web platform).
"""
import json
from pathlib import Path

TOKENS_DIR = Path(__file__).resolve().parent.parent / "skills" / "mmm-huisstijl" / "tokens"
tokens = json.loads((TOKENS_DIR / "tokens.json").read_text(encoding="utf-8"))
themes = [theme["id"] for theme in tokens["color"]["themes"]]
first_theme = themes[0]


def value_for(token, theme):
    value = token["value"]
    if isinstance(value, str):
        return value if theme == first_theme else None
    return value.get(theme)


lines = ["/* Mensen Met Mogelijkheden: CSS custom properties, generated from tokens.json. Do not edit by hand. */"]
for font in tokens["type"]["fonts"]:
    lines.append(
        "@font-face { font-family: '%s'; font-style: normal; font-weight: %s; font-display: swap; "
        "src: url(../fonts/%s) format('woff2'); }" % (font["family"], font["weight"], font["file"].split("/")[-1])
    )
lines.append(':root, [data-theme="%s"] {' % first_theme)
for token in tokens["color"]["tokens"]:
    lines.append("  --%s: %s;" % (token["name"], value_for(token, first_theme)))
for key, stack in tokens["type"]["families"].items():
    lines.append("  --font-%s: %s;" % (key, stack))
for family in ("spacing", "radius", "shadow", "layout"):
    for token in tokens.get(family, {}).get("tokens", []):
        lines.append("  --%s: %s;" % (token["name"], token["value"]))
lines.append("}")
for theme in themes[1:]:
    selector = '[data-theme="%s"]' % theme
    if theme == "donker":
        selector += ', [data-bs-theme="dark"]'
    lines.append(selector + " {")
    for token in tokens["color"]["tokens"]:
        value = value_for(token, theme)
        if value:
            lines.append("  --%s: %s;" % (token["name"], value))
    lines.append("}")
for group in tokens["type"]["groups"]:
    for style in group["styles"]:
        props = [
            "font-family: var(--font-%s)" % group["family"],
            "font-size: %s" % style["fontSize"],
            "line-height: %s" % style["lineHeight"],
            "font-weight: %s" % style["fontWeight"],
        ]
        if "letterSpacing" in style:
            props.append("letter-spacing: %s" % style["letterSpacing"])
        lines.append(".%s { %s; }" % (style["name"], "; ".join(props)))
(TOKENS_DIR / "tokens.css").write_text("\n".join(lines) + "\n", encoding="utf-8")
print("tokens.css updated")
