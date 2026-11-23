#!/usr/bin/env python3
"""Open an MMM template as a regular document, so it can be filled with code.

python-docx and python-pptx refuse .dotx and .potx files because of their content
type. This script rewrites that content type in memory and leaves everything else
(logo, header, footer, brand strip, styles, layouts) untouched.

Usage:
  python3 scripts/template.py notitie uit.docx    # brief, notitie, beleidsstuk, presentatie
  python3 scripts/template.py notitie --toon      # list paragraphs with their style

In Python:
  from template import open_template, remove_instructions
  doc = open_template("notitie")   # python-docx Document (python-pptx Presentation for presentatie)
  remove_instructions(doc)       # drop the grey "Instructie" paragraphs
  ... replace the [placeholders], add paragraphs with the template's styles ...
  doc.save("notitie.docx")
"""

import io
import sys
import zipfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
# templates/ next to SKILL.md in the packaged skill, or templates/ at the repository root.
CANDIDATES = (HERE.parent / "templates", HERE.parent.parent.parent / "templates")
FILES = {
    "brief": "MMM-brief.dotx",
    "notitie": "MMM-notitie.dotx",
    "beleidsstuk": "MMM-beleidsstuk.dotx",
    "presentatie": "MMM-presentatie.potx",
}
CONTENT_TYPES = {
    b"wordprocessingml.template.main+xml": b"wordprocessingml.document.main+xml",
    b"presentationml.template.main+xml": b"presentationml.presentation.main+xml",
}


def template_path(name):
    filename = FILES.get(name, name)
    for folder in CANDIDATES:
        if (folder / filename).is_file():
            return folder / filename
    sys.exit(
        f"Template {filename} not found in {', '.join(str(c) for c in CANDIDATES)}. "
        "Download it from https://raw.githubusercontent.com/mensenmetmogelijkheden/mmm-huisstijl/main/templates/"
        f"{filename}"
    )


def as_document(path):
    """Return the bytes of the template as a regular .docx or .pptx."""
    out = io.BytesIO()
    with zipfile.ZipFile(path) as zin, zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            data = zin.read(item.filename)
            if item.filename == "[Content_Types].xml":
                for old, new in CONTENT_TYPES.items():
                    data = data.replace(old, new)
            zout.writestr(item, data)
    return out.getvalue()


def open_template(name):
    path = template_path(name)
    data = io.BytesIO(as_document(path))
    if path.suffix == ".potx":
        from pptx import Presentation
        return Presentation(data)
    from docx import Document
    return Document(data)


def remove_instructions(doc):
    """Remove the paragraphs in style Instructie (explanations meant for the writer)."""
    for p in list(doc.paragraphs):
        if p.style is not None and p.style.name == "Instructie":
            p._element.getparent().remove(p._element)


def main(argv):
    if len(argv) < 2 or argv[0] not in FILES:
        sys.exit(__doc__)
    name, target = argv[0], argv[1]
    if target == "--toon":
        doc = open_template(name)
        if name == "presentatie":
            for i, layout in enumerate(doc.slide_layouts):
                print(f"layout {i}: {layout.name}")
            return
        for p in doc.paragraphs:
            if p.text.strip():
                print(f"[{p.style.name}] {p.text}")
        return
    Path(target).write_bytes(as_document(template_path(name)))
    print(target)


if __name__ == "__main__":
    main(sys.argv[1:])
