# SharePoint-thema: MMM Indigo

`MMM-Indigo.json` is het thema van het intranet. Op het intranet is **indigo de hoofdkleur** (balk bovenaan, knoppen, links) en rood het accent; de neutrale tinten zijn die van de huisstijl (room, band, rand, tekst). Op de website is rood de hoofdkleur.

| Palet | Huisstijl |
| --- | --- |
| themePrimary #312783 | `indigo` |
| accent #e30613 | `rood` |
| neutralLighterAlt #fbfaf7 | `room` |
| neutralLighter #f6f2ea | `band` |
| neutralLight #f2efe8 | `room-donker` |
| neutralQuaternaryAlt #e6e0d4 | `rand` |
| neutralTertiaryAlt #b9ae9c | `rand-sterk` |
| neutralSecondary #5c554c | `tekst-mild` |
| neutralPrimary #241f1a | `tekst` |
| neutralDark #1a1612 | `room` in de donkere modus |

De overige tinten (themeLighterAlt t/m themeDarker, neutralQuaternary, neutralTertiary, neutralPrimaryAlt, black) zijn afgeleid voor SharePoint en komen niet in de huisstijl voor.

## Installeren of bijwerken

In de SharePoint Online-beheershell:

```powershell
$t = Get-Content .\MMM-Indigo.json -Raw | ConvertFrom-Json
$palet = @{}; $t.palette.PSObject.Properties | ForEach-Object { $palet[$_.Name] = $_.Value }
Add-SPOTheme -Identity "MMM Indigo" -Palette $palet -IsInverted $false -Overwrite
```

Daarna op de site: Instellingen → Uiterlijk wijzigen → Thema → MMM Indigo.

## Gebruikstips

- Snelkoppelingstegels: op `blauw` en `groen` hoort een donker icoon (een wit icoon haalt maar 2,97:1 en 2,11:1), zoals op de gele tegel.
- Gebruik naast de sitenaam het beeldmerk zonder tekst (`skills/mmm-huisstijl/assets/beeldmerk-mmm.png`), zodat de naam er niet twee keer staat.
- Teken het logo niet na; gebruik de bestanden in `skills/mmm-huisstijl/assets/`.

## Paginasjablonen

Op het intranet staan paginasjablonen voor een beleidsdocument en voor nieuwsberichten (Algemeen, P&O, kwaliteit & veiligheid, Opleidingen, Externe ontwikkelingen). Ze hebben allemaal dezelfde huisstijllaag:

- **Kleurkop**: het titelgebied als volledige afbeelding met `mmm-kleurkop-indigo.png`, een effen indigo vlak met vijf zwevende blokjes in de vrije ruimte rechts boven de titel. Geen verloop. Indigo zelf ontbreekt (dat valt weg op indigo) en paars is `paars-licht`. De titel staat wit linksonder.
- **Merkstrip** (`mmm-merkstrip.png`) over de volle breedte direct onder de kop en in een eigen sectie onderaan de pagina.
- De kleurkop is ook de miniatuur in het nieuwsoverzicht, tot de schrijver een eigen foto kiest.
- De uitleg voor schrijvers staat bovenaan de tekst en gaat eruit voor publicatie. De teksten staan in `paginasjablonen/uitleg-beleidsdocument.html` en `paginasjablonen/uitleg-nieuwsbericht.html`.

SharePoint kan de letters van de huisstijl niet laden en koppen niet in `rood-donker` zetten; daar blijft het Segoe UI, de terugvalletter uit de huisstijl.

### Bestanden

| Bestand | Wat |
| --- | --- |
| `paginasjablonen/mmm-kleurkop-indigo.png` | Kleurkop (2400 x 560). Staat op het intranet in Siteactiva → Huisstijl. |
| `paginasjablonen/mmm-merkstrip.png` | Merkstrip (1800 x 12). Staat ook in Siteactiva → Huisstijl. |
| `paginasjablonen/uitleg-*.html` | De uitleg in de sjablonen, zonder de schermafbeeldingen die op het intranet staan. |
| `paginasjablonen/huisstijl-toepassen.js` | Script dat de huisstijllaag op pagina's zet (zie hieronder). |

De twee afbeeldingen maak je opnieuw met `python3 tools/make-sharepoint-assets.py` (kleuren uit `tokens.json`).

### Huisstijl opnieuw toepassen

Is een sjabloon per ongeluk aangepast, komt er een sjabloon bij of verandert de kleurkop, dan zet `huisstijl-toepassen.js` de huisstijllaag (terug) op de pagina's. De tekst op de pagina blijft zoals hij is. Een pagina die al in huisstijl is, slaat het script over.

1. Staan de twee afbeeldingen nog niet in Siteactiva → Huisstijl, upload ze daar dan eerst.
2. Open het intranet in de browser als site-eigenaar en open de ontwikkelaarsconsole (F12).
3. Zet in het script bij `MMM_PAGES` de pagina's die je wilt aanpassen, plak het hele script in de console en druk op Enter. Je ziet per pagina wat het zou veranderen; er wordt nog niets opgeslagen.
4. Klopt het, zet dan `MMM_DRY_RUN` op `false` en draai het opnieuw. Gepubliceerde pagina's worden opnieuw gepubliceerd; concepten (zoals de nieuwssjablonen) blijven concept.

Bestaande pagina's die al met een sjabloon zijn gemaakt, veranderen niet mee. Wil je die ook in de nieuwe stijl, zet ze dan in `MMM_PAGES`.
