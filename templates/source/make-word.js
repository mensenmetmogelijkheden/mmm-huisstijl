// Word templates in the house style of Stichting Mensen Met Mogelijkheden.
// Builds the letter, memo and policy document as .docx; converting to .dotx is a separate step.
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Header, Footer, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType, PageNumber,
  TableOfContents, HeadingLevel, LevelFormat, PageBreak, TabStopType, LineRuleType,
} = require("docx");

const IMG = path.join(__dirname, "img");
const img = (f) => fs.readFileSync(path.join(IMG, f));

const KLEUR = {
  tekst: "241F1A", mild: "5C554C", rood: "E30613", roodDonker: "B8050F",
  indigo: "312783", rand: "E6E0D4", band: "F6F2EA",
};
const F = { tekst: "Atkinson Hyperlegible Next", kop: "Nunito ExtraBold", kopVet: "Nunito", merk: "Titillium Web" };

// A4, margins 2.5 cm left/right, 2.2 cm top
const PAGINA = { size: { width: 11906, height: 16838 }, margin: { top: 1247, bottom: 1300, left: 1418, right: 1418, header: 567, footer: 454 } };
const BREEDTE = 11906 - 1418 * 2; // 9070

const stijlen = {
  default: {
    document: { run: { font: F.tekst, size: 22, color: KLEUR.tekst }, paragraph: { spacing: { after: 140, line: 300, lineRule: LineRuleType.AUTO } } },
    title: { run: { font: F.merk, size: 56, bold: true, color: KLEUR.tekst }, paragraph: { spacing: { before: 0, after: 160 }, keepNext: true } },
    heading1: { run: { font: F.kop, size: 32, color: KLEUR.roodDonker }, paragraph: { spacing: { before: 360, after: 120 }, keepNext: true } },
    heading2: { run: { font: F.kop, size: 26, color: KLEUR.tekst }, paragraph: { spacing: { before: 240, after: 80 }, keepNext: true } },
    heading3: { run: { font: F.kopVet, size: 23, bold: true, color: KLEUR.tekst }, paragraph: { spacing: { before: 180, after: 60 }, keepNext: true } },
  },
  paragraphStyles: [
    { id: "Ondertitel", name: "Ondertitel", basedOn: "Normal", run: { font: F.tekst, size: 28, color: KLEUR.mild }, paragraph: { spacing: { after: 240 } } },
    { id: "Instructie", name: "Instructie", basedOn: "Normal", run: { font: F.tekst, size: 20, italics: true, color: KLEUR.mild }, paragraph: { spacing: { after: 120 } } },
    { id: "Klein", name: "Klein", basedOn: "Normal", run: { font: F.tekst, size: 16, color: KLEUR.mild }, paragraph: { spacing: { after: 0, line: 240, lineRule: LineRuleType.AUTO } } },
    { id: "Bovenkop", name: "Bovenkop", basedOn: "Normal", next: "Normal", run: { font: F.kop, size: 18, allCaps: true, characterSpacing: 40, color: KLEUR.roodDonker }, paragraph: { spacing: { before: 240, after: 60 }, keepNext: true } },
    { id: "Kernboodschap", name: "Kernboodschap", basedOn: "Normal", next: "Normal", run: { font: F.tekst, size: 22, color: KLEUR.tekst }, paragraph: { spacing: { before: 120, after: 200 }, indent: { left: 240 }, border: { left: { style: BorderStyle.SINGLE, size: 18, color: KLEUR.rood, space: 10 } } } },
    { id: "Label", name: "Label", basedOn: "Normal", run: { font: F.kopVet, size: 18, bold: true, color: KLEUR.mild }, paragraph: { spacing: { after: 0 } } },
  ],
};

const nummering = {
  config: [
    { reference: "opsomming", levels: [{ level: 0, format: LevelFormat.BULLET, text: "■", alignment: AlignmentType.LEFT, style: { run: { color: KLEUR.rood, size: 16 }, paragraph: { indent: { left: 360, hanging: 300 } } } }] },
    { reference: "genummerd", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 360 } } } }] },
  ],
};

const p = (tekst, opts = {}) => new Paragraph({ ...opts, children: [new TextRun({ text: tekst, ...(opts.run || {}) })] });
const leeg = (after = 0) => new Paragraph({ spacing: { after }, children: [] });
const instructie = (t) => new Paragraph({ style: "Instructie", children: [new TextRun(t)] });
const opsomming = (t) => new Paragraph({ numbering: { reference: "opsomming", level: 0 }, children: [new TextRun(t)] });
const kop1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)] });
const kop2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] });

const geenRand = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const geenRanden = { top: geenRand, bottom: geenRand, left: geenRand, right: geenRand };
const lijn = { style: BorderStyle.SINGLE, size: 4, color: KLEUR.rand };

// Table with label | value, no side borders, thin rules
function gegevens(rijen, labelBreedte = 2200) {
  const w2 = BREEDTE - labelBreedte;
  return new Table({
    width: { size: BREEDTE, type: WidthType.DXA },
    columnWidths: [labelBreedte, w2],
    rows: rijen.map(([l, v]) => new TableRow({
      children: [
        new TableCell({ width: { size: labelBreedte, type: WidthType.DXA }, borders: { top: geenRand, left: geenRand, right: geenRand, bottom: lijn }, margins: { top: 80, bottom: 80, left: 0, right: 120 },
          children: [new Paragraph({ style: "Label", children: [new TextRun(l)] })] }),
        new TableCell({ width: { size: w2, type: WidthType.DXA }, borders: { top: geenRand, left: geenRand, right: geenRand, bottom: lijn }, margins: { top: 80, bottom: 80, left: 120, right: 0 },
          children: [new Paragraph({ spacing: { after: 0 }, children: [new TextRun(v)] })] }),
      ],
    })),
  });
}

const merkstrip = () => new Paragraph({ spacing: { after: 80 }, children: [new ImageRun({ type: "png", data: img("merkstrip.png"), transformation: { width: 605, height: 4 }, altText: { title: "Merkstrip", description: "Strook in de zes logokleuren", name: "merkstrip" } })] });

const voetRegel = "Stichting Mensen Met Mogelijkheden  ·  Jan Campertstraat 5, 6416 SG Heerlen  ·  046 - 4000 352  ·  info@mensenmetmogelijkheden.nl  ·  mensenmetmogelijkheden.nl";

function voet(metPagina) {
  const kinderen = [merkstrip()];
  const runs = [new TextRun({ text: voetRegel })];
  if (metPagina) runs.push(new TextRun({ text: "\tPagina " }), new TextRun({ children: [PageNumber.CURRENT] }));
  kinderen.push(new Paragraph({ style: "Klein", tabStops: [{ type: TabStopType.RIGHT, position: BREEDTE }], children: runs }));
  return new Footer({ children: kinderen });
}

const logoGroot = (w = 120) => new ImageRun({ type: "png", data: img("logo.png"), transformation: { width: w, height: Math.round(w * 884 / 900) }, altText: { title: "Logo", description: "Logo Mensen Met Mogelijkheden", name: "logo" } });
const beeldmerk = (w = 52) => new ImageRun({ type: "png", data: img("beeldmerk.png"), transformation: { width: w, height: Math.round(w * 485 / 600) }, altText: { title: "Beeldmerk", description: "Beeldmerk Mensen Met Mogelijkheden", name: "beeldmerk" } });

function kopKlein(label) {
  return new Header({ children: [new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: BREEDTE }], spacing: { after: 0 },
    children: [beeldmerk(46), new TextRun({ text: "\t" + label, font: F.kopVet, bold: true, size: 18, color: KLEUR.mild })] })] });
}

const meta = (titel) => ({ creator: "Koen Sadza", lastModifiedBy: "Koen Sadza", title: titel, description: "Sjabloon in de huisstijl van Stichting Mensen Met Mogelijkheden", styles: stijlen, numbering: nummering });

// ---------- Letter ----------
function brief() {
  const kop = new Header({ children: [
    new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: BREEDTE }], spacing: { after: 0 }, children: [logoGroot(92)] }),
  ] });
  return new Document({ ...meta("Brief Mensen Met Mogelijkheden"), sections: [{
    properties: { page: PAGINA, titlePage: true },
    headers: { first: kop, default: kopKlein("") },
    footers: { first: voet(false), default: voet(true) },
    children: [
      leeg(900),
      p("[Naam ontvanger]", { spacing: { after: 0 } }),
      p("[Straat en huisnummer]", { spacing: { after: 0 } }),
      p("[Postcode en plaats]", { spacing: { after: 600 } }),
      gegevens([["Datum", "[17 november 2026]"], ["Onderwerp", "[Waar de brief over gaat, in een paar woorden]"], ["Contact", "[Naam, functie, telefoonnummer]"]], 1600),
      leeg(480),
      p("Beste [naam],"),
      instructie("Begin bij de lezer en zeg in de eerste zin waar de brief over gaat. Schrijf kort, in de wij-vorm, met je of u zoals de lezer dat zelf gebruikt. Geen uitroeptekens."),
      p("[Eerste alinea: waarom we schrijven.]"),
      p("[Tweede alinea: wat er verandert of wat we vragen. Noem wat gelijk blijft.]"),
      p("[Derde alinea: wat de lezer kan doen en bij wie hij terecht kan met vragen.]"),
      leeg(120),
      p("Met vriendelijke groet,", { spacing: { after: 600 } }),
      p("[Naam]", { spacing: { after: 0 } }),
      p("[Functie]", { spacing: { after: 0 } }),
      p("Stichting Mensen Met Mogelijkheden"),
    ],
  }] });
}

// ---------- Memo ----------
function notitie() {
  return new Document({ ...meta("Notitie Mensen Met Mogelijkheden"), sections: [{
    properties: { page: PAGINA },
    headers: { default: kopKlein("Notitie") },
    footers: { default: voet(true) },
    children: [
      new Paragraph({ style: "Bovenkop", children: [new TextRun("Notitie · [onderwerp in twee woorden]")] }),
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("[Titel van de notitie]")] }),
      gegevens([["Aan", "[Bestuur / MT / Raad van Toezicht / OR / cliëntenraad]"], ["Van", "[Functie]"], ["Datum", "[17 november 2026]"], ["Status", "[Ter informatie / Ter bespreking / Ter besluitvorming]"]]),
      leeg(120),
      kop1("Samenvatting"),
      instructie("In drie tot vijf zinnen: waar gaat het over, wat stellen we voor en wat vragen we van de lezer."),
      p("[Samenvatting]"),
      new Paragraph({ style: "Kernboodschap", children: [new TextRun({ text: "[Kernboodschap in één zin.] ", bold: true }), new TextRun("[Hooguit één zin toelichting. Stijl: Kernboodschap.]")] }),
      kop1("Aanleiding"),
      p("[Waarom ligt dit nu voor? Wat is de situatie?]"),
      kop1("Voorstel"),
      p("[Wat stellen we voor? Beschrijf plannen die nog niet vastliggen als voornemen: wij willen.]"),
      kop1("Gevolgen"),
      kop2("Voor bewoners, deelnemers en cliënten"),
      p("[Wat merken zij ervan?]"),
      kop2("Voor medewerkers"),
      p("[Wat merken zij ervan?]"),
      kop2("Financieel"),
      p("[Bedragen als € 12.500. Noem de bron van elk cijfer.]"),
      kop1("Medezeggenschap en toezicht"),
      instructie("Ga na of het voorstel raakt aan het instemmings- of adviesrecht van de OR of de cliëntenraad, en of de Raad van Toezicht geïnformeerd moet worden. Verwijder wat niet van toepassing is."),
      opsomming("Ondernemingsraad: [instemming (art. 27 WOR) / advies (art. 25 WOR) / informeren / niet van toepassing]"),
      opsomming("Cliëntenraad: [instemming / advies (Wmcz 2018) / informeren / niet van toepassing]"),
      opsomming("Raad van Toezicht: [goedkeuring / informeren / niet van toepassing]"),
      kop1("Gevraagd besluit"),
      p("[Wat moet de lezer besluiten, en wanneer?]"),
    ],
  }] });
}

// ---------- Policy document ----------
function beleidsstuk() {
  return new Document({ ...meta("Beleidsstuk Mensen Met Mogelijkheden"), features: { updateFields: true }, sections: [
    {
      properties: { page: PAGINA, titlePage: true },
      headers: { first: new Header({ children: [new Paragraph({ children: [] })] }), default: kopKlein("[Titel beleidsstuk]") },
      footers: { first: new Footer({ children: [merkstrip()] }), default: voet(true) },
      children: [
        new Paragraph({ spacing: { after: 1400 }, children: [logoGroot(130)] }),
        new Paragraph({ spacing: { after: 360 }, children: [new ImageRun({ type: "png", data: img("blokjesrij.png"), transformation: { width: 150, height: 15 }, altText: { title: "Blokjesrij", description: "Zes blokjes in de logokleuren", name: "blokjesrij" } })] }),
        new Paragraph({ style: "Bovenkop", children: [new TextRun("Beleid · [thema]")] }),
        new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("[Titel van het beleidsstuk]")] }),
        new Paragraph({ style: "Ondertitel", children: [new TextRun("[Ondertitel: waar het beleid over gaat]")] }),
        leeg(1600),
        gegevens([["Versie", "[1.0]"], ["Vastgesteld door", "[Bestuur, na advies van ... ]"], ["Datum vaststelling", "[17 november 2026]"], ["Eigenaar", "[Functie]"], ["Evaluatie", "[Datum volgende evaluatie]"]]),
        new Paragraph({ children: [new PageBreak()] }),
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Inhoud")] }),
        new TableOfContents("Inhoud", { hyperlink: true, headingStyleRange: "1-2" }),
        instructie("Werk de inhoudsopgave bij met rechtsklik op de inhoudsopgave en dan Veld bijwerken."),
        new Paragraph({ children: [new PageBreak()] }),
        kop1("1. Inleiding"),
        instructie("Waarom is dit beleid er, voor wie geldt het en wat is het doel? Begin bij de mens: wat betekent het voor bewoners, deelnemers en cliënten?"),
        p("[Tekst]"),
        kop1("2. Uitgangspunten"),
        instructie("Laat zien hoe het beleid past bij onze zorgvisie Ruimte om te leven en de kernwaarden Nieuwsgierig, Proberen en Leven. Noem de wet- en regelgeving waarop het beleid steunt."),
        p("[Tekst]"),
        kop1("3. Werkwijze"),
        kop2("3.1 [Onderdeel]"),
        p("[Tekst]"),
        kop2("3.2 [Onderdeel]"),
        p("[Tekst]"),
        kop1("4. Rollen en verantwoordelijkheden"),
        instructie("Noem functies, geen namen. MMM heeft geen stafafdelingen: beleg taken bij bestuur, teamleiders, zorgregisseurs, coördinerend begeleiders of teams."),
        p("[Tekst]"),
        kop1("5. Medezeggenschap"),
        p("[Welk advies of welke instemming van de OR en de cliëntenraad is gevraagd, en wanneer is die gegeven?]"),
        kop1("6. Evaluatie"),
        p("[Wanneer en hoe evalueren we dit beleid, en wie doet dat?]"),
        kop1("Versiebeheer"),
        gegevens([["[1.0]", "[Datum] · [Eerste vaststelling]"]], 1600),
      ],
    },
  ] });
}

(async () => {
  const uit = path.join(__dirname, "out");
  fs.mkdirSync(uit, { recursive: true });
  for (const [naam, doc] of [["MMM-brief", brief()], ["MMM-notitie", notitie()], ["MMM-beleidsstuk", beleidsstuk()]]) {
    fs.writeFileSync(path.join(uit, naam + ".docx"), await Packer.toBuffer(doc));
    console.log("written", naam);
  }
})();
