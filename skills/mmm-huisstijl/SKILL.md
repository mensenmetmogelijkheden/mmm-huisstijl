---
name: mmm-huisstijl
description: Huisstijl en toon van Mensen Met Mogelijkheden (MMM): kleuren, letters, logo, vorm en schrijfwijze. Gebruik bij alles wat namens MMM wordt gemaakt of geschreven, van tekst en ontwerp tot presentatie.
---

# Huisstijl Mensen Met Mogelijkheden

Gebruik deze skill voor alles wat namens Stichting Mensen Met Mogelijkheden (MMM) wordt gemaakt of geschreven. MMM is een kleinschalige zorgaanbieder in Zuid-Limburg: wonen, dagbesteding, begeleiding thuis en activiteiten voor mensen met een verstandelijke beperking, autisme of een psychische kwetsbaarheid. Missie en slogan: **Meer Mogelijk Maken.** Zorgvisie: **Ruimte om te leven**. Kernwaarden: **Nieuwsgierig · Proberen · Leven**.

## Welk bestand wanneer

| Je maakt | Lees |
| --- | --- |
| tekst van welke soort ook | `references/toon-en-taal.md` (altijd) |
| iets visueels: ontwerp, dia, poster, document met opmaak, webpagina | `references/visuele-identiteit.md` |
| code (HTML/CSS) | `tokens/tokens.css` en `tokens/componenten.css`; letters in `fonts/` |
| een ander formaat dat tokens leest | `tokens/tokens.json` |
| een Word-document, presentatie of e-mail | de sjablonen in de map `templates/` van de repo `mensenmetmogelijkheden/mmm-huisstijl` |
| iets met het logo | `assets/logo-mmm.svg` (standaard), `assets/beeldmerk-mmm.svg` of `.png` (zonder tekst, naast een getypte naam), `assets/logo-mmm-2000.png` (als svg niet werkt), `assets/logo-mmm-wit.svg` (op rood), `assets/logo-mmm-cmyk.pdf` (drukwerk), `assets/icon-512.png` (klein) |

## De kern in elf regels

1. **Kleur heeft een betekenis.** De zes logokleuren: `rood` #e30613 is MMM en actie, `blauw` #009fe3 wonen, `groen` #96c11f dagbesteding, `paars` #662483 activiteiten, `geel` #ffed00 begeleiding thuis, `indigo` #312783 focus en begrijpelijke taal. Gaat iets niet over aanbod (kernwaarden, bestuur), dan mogen de logokleuren om de beurt terugkomen als versiering.
2. **Licht en warm, felheid in de accenten.** Ondergrond `room` #fbfaf7, tekst `tekst` #241f1a, bijtekst `tekst-mild` #5c554c. Geen verlopen. MMM-Web heeft ook een donkere modus (warm donker, #1a1612); daar vallen indigo en paars als vlak bijna weg.
3. **Blauw, groen en geel alleen als vlak, met donkere tekst erop.** Nooit als tekstkleur, nooit witte tekst op blauw of groen. Een wit icoon op blauw of groen alleen als versiering naast een woord dat hetzelfde zegt. Koppen en links in `rood-donker` #b8050f.
4. **Letters:** Titillium Web 600/700 voor naam, slogan en titels; Nunito 800 voor tussenkoppen en knoppen; Atkinson Hyperlegible Next voor lopende tekst (18px, regels van maximaal 70 tekens). Valt een letter weg, dan Segoe UI, Helvetica of Arial.
5. **De vorm is het blokje.** Hoek 4px overal, behalve ronde portretfoto's; geen pilvormen, geen zwevende kaartjes met schaduw (een paar uitzonderingen op de homepage van de website, zie de visuele identiteit). Kaartjes hebben een gekleurde bovenrand van 3px. Terugkerende motieven: de blokjesrij, losse zwevende blokjes (licht gedraaid, decoratief) en de legenda "Elk blokje is iets wat we doen." zodra kleuren iets betekenen.
6. **Het logo** alleen als bestand uit `assets/`: niet natekenen, niet hertinten, niet vervormen. Kleurenlogo op licht, wit logo op `rood`. Drukwerk: het CMYK-bestand.
7. **Toegankelijk:** tekstcontrast minstens 4,5:1, een zichtbare focusring, grote knoppen, kleur nooit als enige drager van betekenis.
8. **Toon:** warm, gewoon, gelijkwaardig, eerlijk. Begin bij de mens, laat het zien met een gewoon moment, zoek wat wél kan en zeg ook waar de grens ligt. Korte zinnen, je/jij naar lezers, wij-vorm namens MMM. Geen uitroeptekens, geen gedachtestreepjes, geen marketingtaal, geen rijtjes van drie bijvoeglijke naamwoorden.
9. **Presentaties:** bovenkop in hoofdletters boven de titel, twee kleine gedraaide blokjes rechtsboven, één boodschap per dia, kernboodschap in een wit vlak met rode lijn, en een leesversie voor wie er niet bij was. Intranet en interne stukken: indigo is daar de hoofdkleur; extern rood.
10. **Woorden:** bewoner (wonen), deelnemer (dagbesteding), cliënt (begeleiding thuis); nooit patiënt. Wat nog niet vastligt is een voornemen ("wij willen").
11. **Privacy:** geen namen of herleidbare details van bewoners, deelnemers, cliënten of verwanten; foto's alleen met toestemming en met een beschrijving.

## Werkwijze

1. Bepaal voor wie het is en over welk aanbod het gaat. Dat bepaalt de toon (zie de tabel in `toon-en-taal.md`) en de kleur.
2. Lees het referentiebestand dat bij je taak hoort, voordat je begint.
3. Gebruik de tokens met hun naam en exacte waarde. Verzin geen nieuwe kleuren, letters of afrondingen. Heb je iets nodig wat er niet in staat, kies dan het dichtstbijzijnde token en meld dat aan wie je helpt.
4. Controleer aan het eind met "Snel controleren" in `toon-en-taal.md` en het contrast bij de kleurtokens.
5. Meld aan wie je helpt als het stuk raakt aan een besluit waar de OR, de cliëntenraad of de Raad van Toezicht bij betrokken moet worden.

## Wat ontbreekt nog

Foto's in hoge resolutie.
