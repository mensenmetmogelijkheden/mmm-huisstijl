# Huisstijl Mensen Met Mogelijkheden

Hier staat de huisstijl van MMM op één plek: hoe we eruitzien (kleuren, letters, logo, vormen) en hoe we klinken (toon en taal). Het is gemaakt zodat **iedere AI-hulp** (Claude, ChatGPT, Copilot) zich eraan houdt als je hem vraagt iets voor MMM te maken, en zodat je het zelf kunt nalezen.

## Wat staat waar

| Bestand | Wat |
| --- | --- |
| `skills/mmm-huisstijl/SKILL.md` | De skill: de kern in elf regels en welk bestand je wanneer leest. Begin hier. |
| `skills/mmm-huisstijl/references/toon-en-taal.md` | De brand voice: hoe MMM klinkt, per lezer, met woordenlijst en voorbeelden. |
| `skills/mmm-huisstijl/references/visuele-identiteit.md` | Kleur, letters, vorm, logo, beeld, toegankelijkheid en alle kleuren in hex, RGB en CMYK. |
| `skills/mmm-huisstijl/tokens/` | Dezelfde waarden voor code: `tokens.json`, `tokens.css` (licht en donker), `componenten.css`. |
| `skills/mmm-huisstijl/assets/` | Logo, beeldmerk zonder tekst, witte versies, drukbestand (CMYK) en app-icoon. |
| `skills/mmm-huisstijl/fonts/` | De drie letters (open licentie, zie de README daar), ook als installeerbare ttf voor Office. |
| `templates/` | Word-sjablonen (brief, notitie, beleidsstuk), PowerPoint-sjabloon en e-mailhandtekening. |
| `integrations/sharepoint/` | Het SharePoint-thema van het intranet (MMM Indigo) en de paginasjablonen (beleidsdocument en nieuwsberichten). |

Een visuele versie met voorbeelden staat ook als Design System in Claude: https://claude.ai/artifact/16hefx9U2ENjGNQpsLg6m3 (alleen zichtbaar voor wie toegang heeft gekregen).

## Zo gebruik je het met je AI-hulp

### Kant-en-klare skill om te uploaden

In de map `dist/` staat de skill als zip-bestand, klaar om te uploaden. De bestanden worden bij elke publicatie opnieuw gemaakt, dus ze zijn altijd gelijk aan de rest van deze repo.

| Bestand | Voor |
| --- | --- |
| `dist/mmm-huisstijl.zip` | Claude en ChatGPT (de hele skill, met logo's en letters) |
| `dist/mmm-huisstijl-copilot.zip` | Microsoft 365 Copilot (alleen de tekstbestanden en tokens) |

Een geüploade skill is een kopie. Verandert de huisstijl, verwijder de oude skill dan en upload het nieuwe bestand.

### Claude (claude.ai of de Claude-app)

- **Voor de hele organisatie (aanbevolen):** een beheerder van het Claude-account van MMM uploadt `dist/mmm-huisstijl.zip` als organisatie-skill. Daarna gebruikt Claude hem bij iedereen vanzelf.
- **Voor jezelf:** ga naar *Customize → Skills*, klik op **+**, kies *Create skill* en daarna *Upload a skill*, en kies `mmm-huisstijl.zip`. Het maken van bestanden (*Code execution and file creation*) moet aanstaan.
- Zeg in je vraag gerust "gebruik de MMM-huisstijl".

### ChatGPT

Ga naar *Skills*, kies *Create* en daarna *Upload from your computer*, en kies `mmm-huisstijl.zip`.

### Microsoft 365 Copilot

Alleen met de licentie Microsoft 365 Copilot. Open *Home*, klik met de rechtermuisknop op *Agents* en kies *More agents*. Kies bij *Add* voor *Upload skill* en kies `mmm-huisstijl-copilot.zip`.

### Claude Code

```
/plugin marketplace add mensenmetmogelijkheden/mmm-huisstijl
/plugin install mmm-huisstijl@mmm-huisstijl
```

### Codex of een andere hulp

- Werk je in een repo van MMM: verwijs in de `AGENTS.md` van die repo naar deze repo, of kopieer de map `skills/mmm-huisstijl` erin.
- In een chat zonder skills: upload `SKILL.md`, `toon-en-taal.md` en `visuele-identiteit.md` en vraag de hulp zich eraan te houden. Of zet ze in een eigen GPT of Copilot-agent als kennisbron.

## Sjablonen

Zie `templates/README.md`. Installeer eerst de letters uit `skills/mmm-huisstijl/fonts/ttf/`, anders kiest Office andere letters.

## Iets aanpassen

De waarden komen uit de website en het MMM-Web-thema. Verandert daar een kleur of letter, pas het dan hier ook aan (en in het Design System), zodat alles gelijk blijft.

- Pas `skills/mmm-huisstijl/tokens/tokens.json` aan; maak `tokens.css` daarna opnieuw met `python3 tools/tokens-to-css.py`.
- Teksten over toon en taal pas je aan in `skills/mmm-huisstijl/references/toon-en-taal.md`.
- De beschrijving bovenin `SKILL.md` mag maximaal 200 tekens zijn, anders weigert Claude de skill. `python3 tools/build-skill-zips.py` controleert dat en maakt de zip-bestanden in `dist/`.
- Aanpassen doen we in de interne werkversie van deze repo, niet hier. Na de beveiligingscontrole zet een workflow de nieuwe versie vanzelf in deze openbare repo. Een wijziging die je hier rechtstreeks maakt, wordt bij de volgende publicatie overschreven.

## Beveiliging

- Deze repo is bewust openbaar. Er staan geen wachtwoorden of sleutels in, geen persoonsgegevens van bewoners, deelnemers, cliënten, verwanten of medewerkers, en geen interne cijfers. Voorbeelden in de richtlijnen en sjablonen zijn verzonnen.
- Logo en huisstijlbestanden zijn van Stichting Mensen Met Mogelijkheden. Ze staan hier zodat collega's en partners ze goed gebruiken, niet als vrije licentie. De letters vallen onder de SIL Open Font License (licentiebestanden staan bij de letters).
- Elke push en pull request wordt gecontroleerd door `.github/workflows/security-scan.yml` (Gitleaks op geheimen, Semgrep op code); wekelijks wordt de hele repo gescand.
- Er draait geen code uit deze repo, behalve de kleine scripts in `tools/` en `templates/source/`, die alleen lokale bestanden lezen en schrijven (de publicatie-workflow draait `tools/build-skill-zips.py` om de zip-bestanden te maken), en `integrations/sharepoint/paginasjablonen/huisstijl-toepassen.js`. Dat script draai je zelf in de browser op het intranet; het gebruikt alleen je eigen sessie en de SharePoint-API van die site, en slaat standaard niets op.
