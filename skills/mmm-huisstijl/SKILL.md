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
| een Word-document, presentatie of e-mail | "Documenten maken" hieronder, en de sjablonen in `templates/` |
| iets met het logo | `assets/logo-mmm.svg` (standaard), `assets/logo-mmm-liggend.svg` (breed en laag), `assets/beeldmerk-mmm.svg` of `.png` (zonder tekst, naast een getypte naam), `assets/beeldmerk-klein.svg` (16 tot 48 px), `assets/logo-mmm-zwart.svg` (één kleur), `assets/logo-mmm-2000.png` (als svg niet werkt), `assets/logo-mmm-wit.svg` (op rood), `assets/logo-mmm-cmyk.pdf` (drukwerk), `assets/icon-512.png` (klein) |

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

## Documenten maken

Maak een brief, notitie, beleidsstuk, presentatie of e-mailhandtekening altijd vanuit het sjabloon, nooit met eigen opmaak. In het sjabloon zitten het logo, de kop- en voettekst, de merkstrip en de stijlen; een nagebouwd document mist die.

**Waar de sjablonen staan:** in `templates/` naast dit bestand (in het zip-pakket van de skill) of in de hoofdmap van de repo `mensenmetmogelijkheden/mmm-huisstijl`. Online: `https://raw.githubusercontent.com/mensenmetmogelijkheden/mmm-huisstijl/main/templates/<bestand>`. Medewerkers van MMM vinden ze ook op het intranet, op de pagina Huisstijl.

**Kun je code uitvoeren,** vul dan het sjabloon zelf:

1. Open het met `scripts/template.py`: `open_template("notitie")` geeft een python-docx-document (een python-pptx-presentatie voor `presentatie`), of `python3 scripts/template.py notitie uit.docx` maakt er een gewoon .docx van. `python3 scripts/template.py notitie --toon` laat de alinea's met hun stijl zien.
2. Vervang de tekst tussen [haken], ook in de tabellen (Aan, Van, Datum, Status op het voorblad). Haal de grijze uitleg in de stijl Instructie weg met `remove_instructions(doc)`.
3. Gebruik voor nieuwe alinea's alleen de stijlen uit het sjabloon: Title, Heading 1 t/m 3 (in een Nederlandse Word: Kop 1 t/m 3), Bovenkop, Kernboodschap, Label, Ondertitel, Klein, en List Paragraph voor opsommingen. Zet geen eigen letters, kleuren of maten.
4. Laat het logo, de kop- en voettekst en de merkstrip staan. Een presentatie bouw je met de indelingen van het sjabloon (MMM Titel, MMM Sectie, enzovoort), niet met losse tekstvakken.

**Kun je geen code uitvoeren,** geef dan de link naar het sjabloon en lever de tekst in de opbouw hieronder, zodat de gebruiker hem erin plakt.

| Sjabloon | Bestand | Opbouw |
| --- | --- | --- |
| Brief | `MMM-brief.dotx` | adres van de ontvanger; Datum, Onderwerp, Contact; aanhef; eerste alinea: waarom we schrijven; tweede: wat er verandert of wat we vragen, en wat gelijk blijft; derde: wat de lezer kan doen en bij wie hij terecht kan; groet, naam, functie |
| Notitie (voor bestuur, MT, Raad van Toezicht, OR, cliëntenraad) | `MMM-notitie.dotx` | bovenkop "Notitie · [onderwerp]"; titel; Aan, Van, Datum, Status; Samenvatting met een kernboodschap in één zin; Aanleiding; Voorstel; Gevolgen (Voor bewoners, deelnemers en cliënten; Voor medewerkers; Financieel); Medezeggenschap en toezicht (OR, cliëntenraad, Raad van Toezicht); Gevraagd besluit |
| Beleidsstuk | `MMM-beleidsstuk.dotx` | voorblad met bovenkop "Beleid · [thema]", titel, ondertitel, Versie, Vastgesteld door, Datum vaststelling, Eigenaar (functie), Evaluatie; Inhoud; 1. Inleiding; 2. Uitgangspunten; 3. Werkwijze; 4. Rollen en verantwoordelijkheden; 5. Medezeggenschap; 6. Evaluatie; Versiebeheer |
| Presentatie | `MMM-presentatie.potx` | indelingen voor titel, onderdeel (algemeen en per soort aanbod), titel en inhoud, twee kolommen, alleen titel en afsluiting; één boodschap per dia, en een leesversie voor wie er niet was |
| E-mailhandtekening | `email/MMM-handtekening.html` | zie `templates/email/README.md` in de repo |

## Werkwijze

1. Bepaal voor wie het is en over welk aanbod het gaat. Dat bepaalt de toon (zie de tabel in `toon-en-taal.md`) en de kleur.
2. Lees het referentiebestand dat bij je taak hoort, voordat je begint.
3. Gebruik de tokens met hun naam en exacte waarde. Verzin geen nieuwe kleuren, letters of afrondingen. Heb je iets nodig wat er niet in staat, kies dan het dichtstbijzijnde token en meld dat aan wie je helpt.
4. Controleer aan het eind met "Snel controleren" in `toon-en-taal.md` en het contrast bij de kleurtokens.
5. Meld aan wie je helpt als het stuk raakt aan een besluit waar de OR, de cliëntenraad of de Raad van Toezicht bij betrokken moet worden.

## Wat ontbreekt nog

Foto's in hoge resolutie.
