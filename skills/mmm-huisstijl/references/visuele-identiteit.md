# Visuele identiteit Mensen Met Mogelijkheden

De huisstijl van Stichting Mensen Met Mogelijkheden (MMM): een kleinschalige aanbieder van wonen, dagbesteding, begeleiding thuis en activiteiten voor mensen met een verstandelijke beperking, autisme of een psychische kwetsbaarheid, op kleine plekken in Zuid-Limburg. Slogan: **Meer Mogelijk Maken.**

Dit is de bron voor iedereen (en elke AI-hulp) die iets maakt namens MMM: de website, MMM-Web, documenten, presentaties, social media, posters en flyers. De waarden komen uit de nieuwe website en het MMM-Web-thema, die dezelfde kleuren en letters gebruiken.

Hoe MMM klinkt staat in `toon-en-taal.md`. Lees die altijd mee als je tekst schrijft.

## Het idee in één zin

Het logo bestaat uit zes gekleurde vierkantjes en een rood figuurtje met de armen omhoog. Die vierkantjes zijn de basis van alles: **kleur heeft een betekenis** (elke soort aanbod heeft een logokleur) en **de vorm is het blokje** (rechte hoeken met een kleine afronding, geen pillen, geen zwevende kaartjes).

## Kleur

### Kleur met een betekenis

| Kleur | Token | Betekenis | Tekst erop |
| --- | --- | --- | --- |
| Rood | `rood` | MMM zelf en actie: knoppen, kantoor, nadruk | wit |
| Blauw | `blauw` | Wonen | `tekst` (donker) |
| Groen | `groen` | Dagbesteding | `tekst` (donker) |
| Paars | `paars` | Activiteiten | wit |
| Geel | `geel` | Begeleiding thuis (ambulant) | `tekst` (donker) |
| Indigo | `indigo` | Focus, de knop voor begrijpelijke taal, hover | wit |

Gaat een pagina, folder of post over één soort aanbod, gebruik dan de kleur van dat aanbod voor de kleurkop, de blokjes en het fotovlak. Gaat het over MMM als geheel, gebruik dan rood, of de zes kleuren samen in de volgorde van het logo: `rood`, `blauw`, `indigo`, `geel`, `groen`, `paars`.

Elke kleur heeft een lichte tint voor achtergronden: `blauw-licht`, `groen-licht`, `paars-licht-vlak`, `geel-licht`.

### Regels

- **De felheid zit in de accenten, niet overal.** De ondergrond is licht en warm (`room`, `band`), de tekst donker (`tekst`). Een kleurvlak is een accent: een kleurkop, een blokje, een knop.
- **Kleur alleen als vlak, tekst altijd donker of wit volgens de tabel.** Blauw, groen en geel zijn nooit tekstkleur op een lichte achtergrond: ze halen het contrast niet (blauw 2,85:1, groen 2,02:1, geel 1,16:1 op `room`).
- **Witte tekst op blauw of groen mag niet** (2,97:1 en 2,11:1). Gebruik `tekst`. Een wit lijnicoon op blauw of groen mag alleen als versiering naast een kop of woord dat hetzelfde zegt, zoals bij de kaartjes en kenmerken op de website. Moet het icoon zelf iets vertellen (een tegel of knop met alleen een icoon), dan een donker icoon.
- **Rood als tekst alleen groot.** Voor koppen en links in lopende tekst `rood-donker` (6,56:1 op `room`).
- **Om de beurt, als het niet over aanbod gaat.** Kaartjes en blokjes voor tussenkoppen die niet over één soort aanbod gaan (kernwaarden, bestuur, een pagina over de organisatie), krijgen de logokleuren om de beurt (kaartjes: blauw, indigo, groen, paars, geel; blokjes voor koppen: rood, blauw, groen, paars, geel, indigo). Dat is versiering, net als in het logo. Gaat een kaartje of pagina wél over aanbod, dan de kleur van dat aanbod.
- **Kleur draagt nooit als enige de betekenis.** Zet er altijd een woord bij ("Wonen", "Dagbesteding"). Blauw en groen liggen voor sommige mensen dicht bij elkaar.
- **Geen verlopen** en geen vage kleurvlekken. Effen vlakken, net als in het logo.
- Meldingen gebruiken de eigen statuskleuren: `succes-*`, `waarschuwing-*`, `fout-*`. Voor knoppen met witte tekst `succes` en `waarschuwing` (donkere varianten van groen en geel).

### Donkere modus

De website is altijd licht. MMM-Web heeft ook een donkere modus, met warme donkere tinten in plaats van grijs of zwart. In `tokens/tokens.css` staat die onder `[data-theme="donker"]` en `[data-bs-theme="dark"]`. Wat er verandert:

- ondergrond `room` #1a1612, vlakken `kaart` #26211c en `band` #2f2924;
- tekst `tekst` #e7e1d8, koppen `tekst-kop` #f4efe7, bijtekst `tekst-mild` #b9b0a4;
- rode tekst wordt lichter: `rood-op-donker` #ff4a55 voor het woordmerk en het accentwoord, `rood-donker` #ff7a82 voor links;
- indigo als tekst of focusring wordt `indigo-op-donker` #9d95f0.

De zes logokleuren blijven in donker hetzelfde. Blauw, geel, groen en rood springen er goed uit; **indigo en paars vallen bijna weg** (1,33:1 en 1,63:1). Gebruik ze in donker alleen decoratief, of altijd met een woord erbij, zoals in de legenda.

### Drukwerk (CMYK)

De logokleuren zijn in het originele logobestand in CMYK vastgelegd. De schermkleuren hierboven zijn daar de standaard omrekening van.

| Kleur | CMYK | Hex (scherm) |
| --- | --- | --- |
| Rood | 0 / 100 / 100 / 0 | #e30613 |
| Blauw | 100 / 0 / 0 / 0 | #009fe3 |
| Indigo | 100 / 100 / 0 / 0 | #312783 |
| Geel | 0 / 0 / 100 / 0 | #ffed00 |
| Groen | 50 / 0 / 100 / 0 | #96c11f |
| Paars | 75 / 100 / 0 / 0 | #662483 |

Pantone-kleuren zijn niet vastgelegd. Vraagt een drukker erom, laat dan de drukker de CMYK-waarden omzetten en een proef maken.

## Letters

Drie letters, alle drie zelf gehost (nooit via Google Fonts of een andere externe dienst, vanwege de AVG):

| Familie | Token | Waarvoor |
| --- | --- | --- |
| Titillium Web 600/700 | `merk` | Woordmerk, slogan en paginatitels (h1). Vierkant-ronde vormen zoals de letter in het logo. |
| Nunito | `kop` | Tussenkoppen (h2, h3), citaten en knoppen. Ronde, open letter. |
| Atkinson Hyperlegible Next | `tekst` | Alle lopende tekst. Door het Braille Institute ontworpen om letters goed uit elkaar te houden (I/l/1, b/d), passend bij onze doelgroep. |

- Lopende tekst is **18px** (`lopende-tekst`), met regels van maximaal 70 tekens (`regel-max`). Kleiner dan `klein` (0,9rem) gaat het niet.
- Tussenkoppen (`h2`) staan in `rood-donker` met een klein gekleurd blokje ervoor (`hoek-klein`): in de kleur van het aanbod op een pagina over aanbod, anders de logokleuren om de beurt, te beginnen met rood.
- Atkinson schrijft de nul met een streep. Op de website komen cijfers in lopende tekst daarom uit Nunito, zodat telefoonnummers en tijden goed leesbaar zijn.
- In Word, PowerPoint en e-mail zijn deze letters niet altijd beschikbaar. Valt het terug, dan op Segoe UI, Helvetica of Arial (staat al in de tokens).
- Nadruk in een zin: een paar woorden in `rood-donker` (op de website `==woorden==`). Geen hoofdletters voor nadruk, geen onderstreping behalve voor links.

## Vorm

- **De MMM-hoek is 4px** (`hoek`): knoppen, velden, foto's, meldingen, kaartjes. Geen pilvormige knoppen, geen grote afrondingen.
- **Portretfoto's zijn rond.** Een foto van één persoon (bestuur, toezicht, een contactpersoon) staat in een cirkel, zonder kleurvlak erachter.
- **Geen zwevende kaartjes met schaduw.** Een kaartje is een gekleurde bovenrand van 3px (`rand-dik`) in de kleur van het aanbod (of om de beurt een logokleur, zie Kleur), met daaronder kop en tekst op de gewone ondergrond.
- **Uitzonderingen op de homepage van de website.** De knop "We doen nog meer" blijft rechtsonder in beeld staan en heeft een zachte schaduw, zodat hij loskomt van de kleurvlakken eronder. De plaatskaartjes (witte kaart met foto) komen bij hover iets omhoog, met een zachte schaduw. De scrolltip "Scroll" is een kleine pil in hoofdletters; die is versiering en verborgen voor schermlezers. Gebruik deze vormen niet elders.
- **Foto's staan op een kleurvlak** (`foto-vlak`): een effen vlak in de kleur van het aanbod, 14px schuin eronder, zoals de blokjes in het logo.
- **De blokjesrij** (zes vierkantjes in de logokleuren, of drie in één kleur) is het terugkerende motief: onder een titel, als strip boven de footer, als afsluiter van een document.
- **Zwevende blokjes.** Losse blokjes in de logokleuren, licht gedraaid (tussen -6 en +8 graden) en verspreid over een vlak, alsof ze net uit het logo zijn gevallen. Ze staan op het intranet en in het merkvlak van MMM-Web (aanmelden). Regels: maximaal zes, één per kleur; `blokje-zwevend` groot (rood iets kleiner); afronding 3px; nooit over tekst, alleen in de vrije ruimte naast of boven de titel; decoratief (geen betekenis, verborgen voor schermlezers). Ze mogen langzaam op en neer zweven (`zweef-duur`, 6px, elk blokje met een eigen starttijd), nooit bij beperk beweging. Op mobiel kleiner (20px) en hooguit vier. Een geel blokje krijgt op licht een dunne `geel-rand`.
- **Legenda: "Elk blokje is iets wat we doen."** De vier aanbodkleuren als klein blokje (14px) met het woord ernaast: Wonen, Dagbesteding, Activiteiten, Begeleiding thuis. Gebruik de legenda overal waar de kleuren iets betekenen, zodat niemand de code hoeft te raden.
- **Aanbodstrip.** Een strip van 3px in de vier aanbodkleuren (blauw, groen, paars, geel) onder de menubalk van MMM-Web. Naast de merkstrip met alle zes logokleuren.
- Ruimte: een band heeft boven en onder `ruimte-band`; de inhoud is maximaal `breedte-max` breed met `ruimte-3` zijmarge.

## Beweging

De beweging komt uit de blokjes, en er is weinig van.

- Op de homepage van de website vallen de zes blokjes binnen en stapelen ze zich tot het figuurtje uit het logo. Bij scrollen vliegen ze naar hun plek op de kaart en klappen ze open tot een kleurvlak per soort aanbod.
- Een kleurkop klapt open vanuit één blokje; het blokje voor een tussenkop draait mee bij scrollen; zwevende blokjes bewegen langzaam op en neer.
- Knoppen vullen zich bij hover van onder naar boven met `indigo`.
- Op de andere pagina's van de website komt de inhoud bij het scrollen één keer rustig binnen: alinea's, kaartjes en kenmerken schuiven een klein stukje omhoog en worden zichtbaar, broertjes kort na elkaar; foto's worden van boven naar beneden onthuld; het blokje voor een tussenkop valt erin. Eén keer per element, nooit opnieuw bij terugscrollen.
- Geen stuiterende knoppen, geen tekst die blijft bewegen.
- Bij "beperk beweging" staat alles meteen op zijn plek, zonder animatie. Zonder JavaScript staat alles gewoon onder elkaar.

## Logo

Alle logobestanden staan in de map `assets/` van deze skill.

| Bestand | Wanneer |
| --- | --- |
| `logo-mmm.svg` | Standaard, voor scherm: website, MMM-Web, presentaties, documenten. Schaalt zonder kwaliteitsverlies. |
| `beeldmerk-mmm.svg` / `beeldmerk-mmm.png` | Het logo zonder tekst: figuurtje en zes vierkantjes. Naast het getypte woordmerk (kop van de website, sjablonen), en als favicon en profielfoto. |
| `beeldmerk-mmm-wit.svg` | Beeldmerk met het figuurtje en het rode vierkantje in wit, voor op een `rood` vlak. |
| `logo-mmm-2000.png` | Waar svg niet werkt (sommige versies van Word en PowerPoint, social media). |
| `logo-mmm-wit.svg` / `logo-mmm-wit-2000.png` | Op een `rood` vlak (daar is hij voor gemaakt) of op een donkere foto of de donkere band. |
| `logo-mmm-cmyk.pdf` | Drukwerk: het originele ontwerpbestand in CMYK. Geef dit aan de drukker. |
| `logo-mmm.png` | Klein logo zoals op de website (430 x 413 px). |
| `icon-512.png` | App-icoon: favicon, profielfoto op social media en andere kleine plekken. |

- Gebruik het kleurenlogo op een lichte ondergrond (`room`, `kaart`, wit), het witte logo op `rood`.
- Op de donkere band of een donkere foto mag het witte logo ook, maar daar vallen de vierkantjes in `indigo` en `paars` deels weg. Kies daarom liever een rood vlak.
- Niet vervormen, niet opnieuw tekenen, geen schaduw, geen andere kleuren, niet op blauw, groen of geel.
- Laat er minstens de breedte van één vierkantje vrije ruimte omheen.
- Is de naam al getypt in de buurt (een kop, een sjabloon), gebruik dan het beeldmerk in plaats van het volledige logo, zodat de naam er niet twee keer staat.
- Het figuurtje heeft bewust een krijtachtige rand: dat is geen fout in het bestand.

## Waar de huisstijl staat

| Plek | Wat er eigen aan is |
| --- | --- |
| Website (www.mensenmetmogelijkheden.nl) | Licht, `rood` voor knoppen, kleurkoppen per soort aanbod, de opening waarin de blokjes het figuurtje bouwen. |
| MMM-Web (HumHub) | Zelfde kleuren en letters, met een donkere modus. Zwevende blokjes en legenda op het aanmeldscherm. |
| Intranet (SharePoint) | Thema **MMM Indigo**: `indigo` is hier de hoofdkleur (balk bovenaan, knoppen, links), `rood` het accent. Neutrale tinten uit de huisstijl (`room`, `band`, `rand`, `tekst`). Startpagina met zwevende blokjes en snelkoppelingen als gekleurde tegels. Paginasjablonen (beleidsdocument, nieuwsberichten) met een indigo kleurkop met zwevende blokjes en de merkstrip onder de kop en onderaan de pagina. Thema, sjabloonteksten en afbeeldingen staan in de repo `mmm-huisstijl` onder `integrations/sharepoint`. |
| Presentaties | Lichte dia's met een **bovenkop** boven de titel, twee kleine gedraaide blokjes rechtsboven als signatuur, witte kaartjes, grote kerncijfers, een tijdlijn met gekleurde strepen en een **kernboodschap** met een rode lijn links. Bij een presentatie voor verwanten hoort een leesversie (zie `toon-en-taal.md`). |
| Documenten en presentaties | Sjablonen voor brief, notitie, beleidsstuk (Word) en presentatie (PowerPoint), plus een e-mailhandtekening, in de repo `mmm-huisstijl` onder `templates`. |

Intern is indigo dus de hoofdkleur, extern rood. Op een snelkoppelingstegel zegt het icoon zelf iets, dus: op `blauw`, `groen` en `geel` een donker icoon, op `rood`, `indigo` en `paars` een wit icoon.

## Iconen en beeld

- **De gekleurde vierkantjes zijn het iconensysteem voor het aanbod.** Een blauw blokje is wonen, een groen blokje dagbesteding. Gebruik geen losse stockiconen waar een blokje volstaat.
- Waar een icoon nodig is (een adres, een telefoon), een eenvoudig lijnicoon in `tekst` of in een blokje met `hoek`.
- Geen emoji als opmaak, geen illustraties met gezichten of mascottes.
- **Foto's**: echte mensen op echte plekken van MMM. Alleen foto's waarvoor de mensen die erop staan toestemming hebben gegeven. Altijd met een beschrijving (alt-tekst) die zegt wat er te zien is ("Twee bewoners aan het werk in de moestuin"). Toon foto's op hun ware grootte: niet uitvergroten.

## Toegankelijkheid

Onze lezers zijn ook mensen met een verstandelijke beperking en hun netwerk. Daarom:

- Tekst haalt minstens 4,5:1 contrast (groot vanaf 24px: 3:1). De contrastwaarden staan bij elk kleurtoken.
- Knoppen zijn groot genoeg om te raken; keuzeknoppen minstens `knop-hoogte-min` hoog.
- De focusring (`focus`, 3px `indigo`) is altijd zichtbaar.
- Beweging rustig en spaarzaam (zie Beweging), en nooit als iemand "beperk beweging" heeft ingesteld.
- Belangrijke informatie komt er ook in **begrijpelijke taal** (zie `toon-en-taal.md`).

## Bouwstenen

Voorbeeldstijlen staan in `tokens/componenten.css` (klassen met prefix `mmm-`). Ze zijn met de hand nagebouwd uit de website.

- **Knop.** Primair: `rood` met witte tekst, één per scherm of sectie. Tweede keuze: rand en tekst in `rood-donker`. Wissel naar begrijpelijke taal: `indigo`. Altijd `hoek`, nooit pilvormig, geen schaduw. De tekst zegt wat er gebeurt ("Aanmelden voor wonen", niet "Klik hier").
- **Kleurkop.** Bovenaan een pagina, dia of folder over één soort aanbod: een effen vlak in de aanbodkleur, titel in `kleurkop-titel`, drie blokjes eronder. Algemeen: `indigo` met de zes logokleuren.
- **Kaartje.** Gekleurde bovenrand van 3px, blokje in dezelfde kleur, kop (`h3`), korte tekst in `tekst-mild`, link in `rood-donker` onderaan. Geen achtergrond, geen schaduw. Kleur: die van het aanbod, of om de beurt een logokleur als het kaartje niet over aanbod gaat.
- **Blokjesrij en merkstrip.** De zes logokleuren in logovolgorde als losse blokjes of als strip van 6px over de volle breedte. Decoratief.
- **Formulierveld.** Label altijd zichtbaar boven het veld, veld in `room` met rand `veldrand`; bij focus wordt het veld wit (`kaart`) met een `indigo` rand en focusring. Hulptekst in `tekst-mild`.
- **Melding.** Vlak, tekst en rand uit `succes-*`, `waarschuwing-*` of `fout-*`. Zeg in gewone woorden wat er is en wat de lezer nu kan doen.
- **Zwevende blokjes en legenda.** Zie Vorm hierboven; klassen `mmm-zwevend`, `mmm-legenda` en `mmm-aanbodstrip`.
- **Bovenkop, kernboodschap, kerncijfer en tijdlijn** (presentaties): klassen `mmm-bovenkop`, `mmm-kernboodschap`, `mmm-kerncijfer`, `mmm-tijdlijn`; zie Waar de huisstijl staat.
- **Fotovlak.** Foto met `hoek` op een effen vlak in de aanbodkleur, 14px schuin eronder (`foto-vlak`).
- **Portret.** Foto van één persoon in een cirkel (`mmm-portret`), met de naam eronder. Geen kleurvlak erachter.

## Alle kleuren met RGB-waarden

Voor Word, PowerPoint, Canva en andere programma's waarin je kleuren als RGB invult. De kolom Donker geldt alleen voor de donkere modus van MMM-Web.

| Token | Hex | RGB | Donker | Gebruik |
| --- | --- | --- | --- | --- |
| `rood` | #e30613 | 227,6,19 |  | Logokleur en hoofdkleur van MMM. Achtergrond van primaire knoppen met witte tekst (4,88:1). Als tekst alleen vanaf 24px of vet 19px op room (4,68:1). Op donker als vlak prima; als tekst op donker rood-op-donker gebruiken. |
| `rood-donker` | #b8050f | 184,5,15 | #ff7a82 | Tussenkoppen (h2), links en de hover van rode knoppen. Witte tekst erop 6,85:1; op room 6,56:1. Donker: #ff7a82 voor links en rode accenten (6,35:1 op kaart). |
| `blauw` | #009fe3 | 0,159,227 |  | Logokleur. Betekent wonen. Alleen als vlak; tekst erop altijd in tekst-kleur (5,50:1), nooit wit (2,97:1). |
| `indigo` | #312783 | 49,39,131 |  | Logokleur. Focusring, taalknop (begrijpelijke taal) en de hover-vulling van knoppen. Witte tekst erop 12,01:1. In donker valt indigo als vlak bijna weg (1,33:1 op kaart): alleen decoratief, of met een label erbij. |
| `geel` | #ffed00 | 255,237,0 |  | Logokleur. Betekent begeleiding thuis. Alleen als vlak met donkere tekst (13,50:1), of als linkkleur op de donkere footer. Nooit als tekst op room (1,16:1). |
| `groen` | #96c11f | 150,193,31 |  | Logokleur. Betekent dagbesteding. Alleen als vlak met donkere tekst (7,73:1); wit erop is onleesbaar (2,11:1). |
| `paars` | #662483 | 102,36,131 |  | Logokleur. Betekent activiteiten. Witte tekst erop 9,79:1. In donker valt paars als vlak deels weg (1,63:1 op kaart): alleen decoratief, of met een label erbij. |
| `paars-licht` | #b469d6 | 180,105,214 |  | Lichte paars voor het zesde blokje op een indigo kleurkop, waar paars wegvalt. Decoratief (3,39:1 op indigo). |
| `blauw-licht` | #dff2fb | 223,242,251 | #0a3446 | Tint bij wonen: achtergrond van een gekozen of uitgelicht wonen-element; in MMM-Web de highlight-achtergrond. |
| `blauw-zacht` | #f1f9fd | 241,249,253 | #1b2428 | Zachtste blauwe tint (MMM-Web highlight-soft). |
| `groen-licht` | #eef5dc | 238,245,220 |  | Tint bij dagbesteding. |
| `paars-licht-vlak` | #efe4f3 | 239,228,243 |  | Tint bij activiteiten. |
| `geel-licht` | #fff8c4 | 255,248,196 |  | Tint bij begeleiding thuis. |
| `room` | #fbfaf7 | 251,250,247 | #1a1612 | Pagina-achtergrond en de achtergrond van invoervelden op de website. Licht en warm, nooit puur wit als ondergrond van een hele pagina. Donker: #1a1612, de pagina-achtergrond van MMM-Web in donkere modus. |
| `room-donker` | #f2efe8 | 242,239,232 | #2f2924 | Iets donkerdere ondergrond, bijvoorbeeld voor lichte vlakken in MMM-Web. |
| `band` | #f6f2ea | 246,242,234 | #2f2924 | Achtergrond van een lichte band (sectie over de volle breedte). Donker: #2f2924. |
| `kaart` | #ffffff | 255,255,255 | #26211c | Wit: vlakken die boven room moeten uitkomen, en een invoerveld met focus. Donker: #26211c, kaarten en het merkvlak op MMM-Web. |
| `tekst` | #241f1a | 36,31,26 | #e7e1d8 | Lopende tekst en koppen (15,65:1 op room). Ook de achtergrond van de donkere band en de footer. Donker: #e7e1d8 (12,27:1 op kaart). |
| `tekst-kop` | #241f1a | 36,31,26 | #f4efe7 | Koppen. In licht gelijk aan tekst; in donker iets lichter (13,93:1 op kaart). |
| `tekst-mild` | #5c554c | 92,85,76 | #b9b0a4 | Ondertitels, toelichting en kleine tekst (7,04:1 op room, 6,58:1 op band). Donker: #b9b0a4 (7,45:1 op kaart). |
| `tekst-zacht` | #857c70 | 133,124,112 | #a79e92 | Alleen voor meta-informatie van minstens 16px in MMM-Web (3,93:1): niet voor lopende tekst. |
| `rand` | #e6e0d4 | 230,224,212 | #3a332c | Scheidingslijnen en tabelregels. Decoratief. |
| `rand-sterk` | #b9ae9c | 185,174,156 | #6f675d | Duidelijkere scheiding, randen van invoervelden in MMM-Web. Decoratief (2,10:1); voor een veldrand op de website veldrand gebruiken. Donker: #6f675d. |
| `veldrand` | #8f8576 | 143,133,118 | #5a5148 | Rand van invoervelden op de website (3,48:1 op room). Donker: #5a5148 (zoals in MMM-Web), maar dat haalt op kaart maar 2,05:1, onder de 3:1 voor een veldrand. Verbeterpunt voor het MMM-Web-thema. |
| `donker-tekst` | #f0e6da | 240,230,218 |  | Tekst op de donkere band (achtergrond tekst). |
| `donker-tekst-mild` | #d8cdc0 | 216,205,192 |  | Alinea's op de donkere band (10,43:1). |
| `donker-tekst-zacht` | #b3a89a | 179,168,154 |  | Kleine bijtekst in de footer (6,99:1 op tekst). |
| `succes` | #4f7a0c | 79,122,12 |  | Donker groen voor succesknoppen met witte tekst (5,10:1). Groen zelf is te licht voor witte tekst. |
| `succes-tekst` | #3f6209 | 63,98,9 |  | Tekst in een succesmelding op succes-vlak (6,54:1). |
| `succes-vlak` | #f3f8e6 | 243,248,230 |  | Achtergrond van een succesmelding. |
| `succes-rand` | #b8d66a | 184,214,106 |  | Rand van een succesmelding. |
| `waarschuwing` | #8a6d00 | 138,109,0 |  | Donker geel voor waarschuwingsknoppen met witte tekst (4,92:1). |
| `waarschuwing-tekst` | #7a5c00 | 122,92,0 |  | Tekst in een waarschuwing op waarschuwing-vlak (5,90:1). |
| `waarschuwing-vlak` | #fff9db | 255,249,219 |  | Achtergrond van een waarschuwing. |
| `waarschuwing-rand` | #efd25c | 239,210,92 |  | Rand van een waarschuwing. |
| `fout-tekst` | #a1040d | 161,4,13 |  | Tekst in een foutmelding op fout-vlak (7,25:1). |
| `fout-vlak` | #fdeced | 253,236,237 |  | Achtergrond van een foutmelding. |
| `fout-rand` | #f2a3a8 | 242,163,168 |  | Rand van een foutmelding. |
| `rood-op-donker` | #ff4a55 | 255,74,85 |  | Rode tekst op een donkere ondergrond: het woordmerk en het accentwoord in de slogan (Maken.) in de donkere modus van MMM-Web. 4,83:1 op kaart (donker). Niet op licht gebruiken. |
| `indigo-op-donker` | #9d95f0 | 157,149,240 |  | Links en focusring in de donkere modus van MMM-Web, waar indigo onleesbaar is (6,07:1 op kaart donker). Niet op licht gebruiken. |
| `geel-rand` | #c9b800 | 201,184,0 |  | Dunne binnenrand (inset 1,5 tot 2px) om een geel blokje, zodat het op een lichte ondergrond zichtbaar blijft. Geel zelf haalt op room maar 1,16:1. |

## Bronnen en wat nog ontbreekt

Overgenomen uit de stylesheets van de website en van MMM-Web (stand 17 november 2026): kleuren, letters (de latin-bestanden), hoeken, ruimtes, statuskleuren en app-icoon. Logo's en CMYK-waarden uit de originele logobestanden (Illustrator, 2011; svg-versie in de huidige schermkleuren).

Niet overgenomen of nog open:

- foto's in hoge resolutie (de huidige zijn 285 tot 866 px breed);
- de latin-ext-bestanden van de letters (alleen nodig voor tekens buiten West-Europese talen);
- foto's in hoge resolutie blijven het grootste gat.
