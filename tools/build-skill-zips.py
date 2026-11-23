#!/usr/bin/env python3
"""Package the mmm-huisstijl skill as ZIP files for upload in AI chat apps.

Writes two files to the output directory (default: dist/):

- mmm-huisstijl.zip: the whole skill folder as the top-level directory
  (mmm-huisstijl/SKILL.md, ...). For Claude and ChatGPT, which expect the
  skill folder itself inside the archive.
- mmm-huisstijl-copilot.zip: SKILL.md at the root of the archive, with the
  text reference files and tokens only. For Microsoft 365 Copilot, which
  expects SKILL.md at the root.

The archives are reproducible: fixed timestamps, sorted entries and readable
file permissions (0644), so the same skill always gives byte-identical files.
The script also checks the skill metadata against the strictest upload limits.

Usage: python3 tools/build-skill-zips.py [output-dir]
"""

import re
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILL_DIR = ROOT / "skills" / "mmm-huisstijl"
NAME = SKILL_DIR.name
# Claude.ai accepts at most 200 characters; the Agent Skills specification allows 1024.
MAX_DESCRIPTION = 200
# Copilot gets the text files only.
COPILOT_PARTS = ("SKILL.md", "references", "tokens")
FIXED_TIME = (2026, 1, 1, 0, 0, 0)


def frontmatter(text):
    match = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    if not match:
        sys.exit("SKILL.md has no frontmatter")
    fields = {}
    for line in match.group(1).splitlines():
        key, sep, value = line.partition(":")
        if sep:
            fields[key.strip()] = value.strip()
    return fields


def check_metadata():
    fields = frontmatter((SKILL_DIR / "SKILL.md").read_text(encoding="utf-8"))
    if fields.get("name") != NAME:
        sys.exit(f"name in SKILL.md must be {NAME!r}, the folder name")
    description = fields.get("description", "")
    if not description:
        sys.exit("SKILL.md has no description")
    if len(description) > MAX_DESCRIPTION:
        sys.exit(f"description is {len(description)} characters; the limit is {MAX_DESCRIPTION}")
    if "<" in description or ">" in description:
        sys.exit("description must not contain angle brackets")


def files(parts=None):
    for path in sorted(SKILL_DIR.rglob("*")):
        if not path.is_file() or path.name.startswith("."):
            continue
        rel = path.relative_to(SKILL_DIR)
        if parts is None or rel.parts[0] in parts:
            yield path, rel.as_posix()


def write_zip(target, entries):
    with zipfile.ZipFile(target, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
        for path, arcname in entries:
            info = zipfile.ZipInfo(arcname, date_time=FIXED_TIME)
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o100644 << 16  # regular file, rw-r--r--
            info.create_system = 3  # Unix, so the permissions are honoured
            zf.writestr(info, path.read_bytes())


def main():
    out = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "dist"
    out.mkdir(parents=True, exist_ok=True)
    check_metadata()
    write_zip(out / f"{NAME}.zip", ((p, f"{NAME}/{rel}") for p, rel in files()))
    write_zip(out / f"{NAME}-copilot.zip", files(COPILOT_PARTS))
    for z in (f"{NAME}.zip", f"{NAME}-copilot.zip"):
        print(f"{out / z}: {(out / z).stat().st_size} bytes")


if __name__ == "__main__":
    main()
