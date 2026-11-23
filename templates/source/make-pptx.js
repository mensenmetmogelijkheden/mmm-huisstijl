// PowerPoint template in the house style of Stichting Mensen Met Mogelijkheden.
const path = require("path");
const pptxgen = require("pptxgenjs");
// applyTheme writes the theme colours and fonts into the .pptx; set APPLY_THEME to the path of apply_theme.js.
const { applyTheme } = require(process.env.APPLY_THEME || "./apply_theme.js");

const IMG = (f) => path.join(__dirname, "img", f);
const THEME = {
  name: "Mensen Met Mogelijkheden",
  headFontFace: "Titillium Web",
  bodyFontFace: "Atkinson Hyperlegible Next",
  colors: {
    dk1: "241F1A", lt1: "FFFFFF", dk2: "312783", lt2: "FBFAF7",
    accent1: "E30613", accent2: "009FE3", accent3: "96C11F", accent4: "662483", accent5: "FFED00", accent6: "B8050F",
    hlink: "B8050F", folHlink: "662483",
  },
};
const HEX = { tekst: "241F1A", mild: "5C554C", room: "FBFAF7", indigo: "312783", rood: "E30613", roodDonker: "B8050F", blauw: "009FE3", groen: "96C11F", paars: "662483", geel: "FFED00", geelRand: "C9B800", wit: "FFFFFF" };

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13,33 x 7,5 inch
pres.author = "Koen Sadza";
pres.company = "Stichting Mensen Met Mogelijkheden";
pres.title = "Sjabloon Mensen Met Mogelijkheden";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;

const W = 13.333, H = 7.5, M = 0.6;
const logoW = 1.05, logoH = logoW * 884 / 900;
const bmW = 0.62, bmH = bmW * 485 / 600;

// Six floating squares, as on MMM-Web and the intranet (decorative)
function zwevend(x0, y0) {
  const b = [
    [C.text2, 0.2, 0.3, -2, 0.62], [C.accent2, 2.4, 0.0, 5, 0.62], [C.accent3, 3.9, 1.5, 8, 0.62],
    [C.accent1, 1.1, 2.3, -6, 0.56], [C.accent4, 3.1, 3.3, -4, 0.62], [C.accent5, 0.7, 4.2, 3, 0.62],
  ];
  return b.map(([kleur, x, y, r, s]) => ({ rect: { x: x0 + x, y: y0 + y, w: s, h: s, fill: { color: kleur }, rotate: r, ...(kleur === C.accent5 ? { line: { color: HEX.geelRand, width: 1.5 } } : {}) } }));
}
// Row of six squares in logo order
function blokjesrij(x, y, s = 0.2, gap = 0.12) {
  const kl = [C.accent1, C.accent2, C.text2, C.accent5, C.accent3, C.accent4];
  return kl.map((k, i) => ({ rect: { x: x + i * (s + gap), y, w: s, h: s, fill: { color: k } } }));
}
function drieBlokjes(x, y, kleur, s = 0.24, gap = 0.18) {
  return [0, 1, 2].map((i) => ({ rect: { x: x + i * (s + gap), y, w: s, h: s, fill: { color: kleur } } }));
}
const signatuur = () => ([
  { rect: { x: W - M - 0.42, y: 0.42, w: 0.26, h: 0.26, fill: { color: C.accent3 }, rotate: -8 } },
  { rect: { x: W - M - 0.14, y: 0.66, w: 0.19, h: 0.19, fill: { color: C.accent1 }, rotate: 6 } },
]);
const voet = () => ([
  { image: { x: M, y: H - 0.5 - 0.3, w: 0.37, h: 0.3, path: IMG("beeldmerk.png"), altText: "Beeldmerk Mensen Met Mogelijkheden" } },
  { placeholder: { options: { name: "voet", type: "body", align: "left", x: M + 0.5, y: H - 0.78, w: 8, h: 0.3, fontSize: 10, color: C.text1, valign: "middle", margin: 0 }, text: "Naam van het overleg · datum" } },
]);
const nummer = { x: W - M - 0.5, y: H - 0.78, w: 0.5, h: 0.3, fontSize: 10, color: C.text1, align: "right" };

// ---------- Layouts ----------
pres.defineSlideMaster({
  title: "MMM Titel",
  background: { color: C.background2 },
  objects: [
    { image: { x: M, y: 0.5, w: logoW, h: logoH, path: IMG("logo.png"), altText: "Logo Mensen Met Mogelijkheden" } },
    ...zwevend(8.2, 1.3),
    { placeholder: { options: { name: "title", type: "title", align: "left", x: M, y: 2.35, w: 7.2, h: 2.2, fontSize: 54, bold: true, color: C.text1, valign: "bottom", margin: 0 }, text: "Titel van de presentatie" } },
    { placeholder: { options: { name: "body", type: "body", align: "left", x: M, y: 4.75, w: 7.0, h: 1.0, fontSize: 20, color: C.text1, valign: "top", margin: 0 }, text: "Ondertitel, datum of naam van het overleg" } },
  ],
});

const secties = [
  ["MMM Sectie", C.text2, C.background1, "Algemeen"],
  ["MMM Sectie Wonen", C.accent2, C.text1, "Wonen"],
  ["MMM Sectie Dagbesteding", C.accent3, C.text1, "Dagbesteding"],
  ["MMM Sectie Activiteiten", C.accent4, C.background1, "Activiteiten"],
  ["MMM Sectie Begeleiding thuis", C.accent5, C.text1, "Begeleiding thuis"],
];
for (const [naam, vlak, inkt] of secties) {
  pres.defineSlideMaster({
    title: naam,
    background: { color: vlak },
    objects: [
      ...(naam === "MMM Sectie" ? blokjesrij(M, 4.95, 0.3, 0.18).map((o, i) => (i === 2 ? { rect: { ...o.rect, fill: { color: C.background2 } } } : o)) : drieBlokjes(M, 4.95, inkt, 0.3, 0.22)),
      { placeholder: { options: { name: "title", type: "title", align: "left", x: M, y: 2.2, w: 11.5, h: 2.5, fontSize: 66, bold: true, color: inkt, valign: "bottom", margin: 0 }, text: "Titel van het onderdeel" } },
    ],
  });
}

pres.defineSlideMaster({
  title: "MMM Titel en inhoud",
  background: { color: C.background2 },
  margin: [0.6, 0.6, 1.0, 0.6],
  objects: [
    ...signatuur(),
    { placeholder: { options: { name: "bovenkop", type: "body", align: "left", x: M, y: 0.5, w: 9, h: 0.32, fontSize: 12, bold: true, fontFace: "Nunito", charSpacing: 2, color: C.accent6, valign: "bottom", margin: 0 }, text: "BOVENKOP" } },
    { placeholder: { options: { name: "title", type: "title", align: "left", x: M, y: 0.86, w: W - 2 * M - 0.8, h: 0.8, fontSize: 34, bold: true, color: C.text1, valign: "top", margin: 0 }, text: "Titel van de dia" } },
    { placeholder: { options: { name: "body", type: "body", align: "left", x: M, y: 1.95, w: W - 2 * M, h: 4.6, fontSize: 18, color: C.text1, valign: "top", margin: 0 }, text: "Tekst" } },
    ...voet(),
  ],
  slideNumber: nummer,
});

pres.defineSlideMaster({
  title: "MMM Twee kolommen",
  background: { color: C.background2 },
  objects: [
    ...signatuur(),
    { placeholder: { options: { name: "bovenkop", type: "body", align: "left", x: M, y: 0.5, w: 9, h: 0.32, fontSize: 12, bold: true, fontFace: "Nunito", charSpacing: 2, color: C.accent6, valign: "bottom", margin: 0 }, text: "BOVENKOP" } },
    { placeholder: { options: { name: "title", type: "title", align: "left", x: M, y: 0.86, w: W - 2 * M - 0.8, h: 0.8, fontSize: 34, bold: true, color: C.text1, valign: "top", margin: 0 }, text: "Titel van de dia" } },
    { placeholder: { options: { name: "links", type: "body", align: "left", x: M, y: 1.95, w: 5.8, h: 4.6, fontSize: 18, color: C.text1, valign: "top", margin: 0 }, text: "Linkerkolom" } },
    { placeholder: { options: { name: "rechts", type: "body", align: "left", x: M + 6.33, y: 1.95, w: 5.8, h: 4.6, fontSize: 18, color: C.text1, valign: "top", margin: 0 }, text: "Rechterkolom" } },
    ...voet(),
  ],
  slideNumber: nummer,
});

pres.defineSlideMaster({
  title: "MMM Alleen titel",
  background: { color: C.background2 },
  objects: [
    ...signatuur(),
    { placeholder: { options: { name: "bovenkop", type: "body", align: "left", x: M, y: 0.5, w: 9, h: 0.32, fontSize: 12, bold: true, fontFace: "Nunito", charSpacing: 2, color: C.accent6, valign: "bottom", margin: 0 }, text: "BOVENKOP" } },
    { placeholder: { options: { name: "title", type: "title", align: "left", x: M, y: 0.86, w: W - 2 * M - 0.8, h: 0.8, fontSize: 34, bold: true, color: C.text1, valign: "top", margin: 0 }, text: "Titel van de dia" } },
    ...voet(),
  ],
  slideNumber: nummer,
});

pres.defineSlideMaster({
  title: "MMM Afsluiting",
  background: { color: C.background2 },
  objects: [
    ...zwevend(8.2, 1.3),
    { text: { text: "Meer Mogelijk", options: { x: M, y: 1.75, w: 7.4, h: 1.3, fontFace: "Titillium Web", fontSize: 72, bold: true, color: C.text1, valign: "bottom", margin: 0 } } },
    { text: { text: "Maken.", options: { x: M, y: 3.0, w: 7.4, h: 1.3, fontFace: "Titillium Web", fontSize: 72, bold: true, color: C.accent1, valign: "top", margin: 0 } } },
    { placeholder: { options: { name: "body", type: "body", align: "left", x: M, y: 4.8, w: 7.2, h: 1.6, fontSize: 18, color: C.text1, valign: "top", margin: 0 }, text: "Contactpersoon, e-mailadres en telefoonnummer" } },
    { image: { x: M, y: H - 0.42 - bmH, w: bmW, h: bmH, path: IMG("beeldmerk.png"), altText: "Beeldmerk Mensen Met Mogelijkheden" } },
  ],
});

// ---------- Example slides ----------
const VOET = "Naam van het overleg · datum";
const kaart = (sl, x, y, w, h, naam) => sl.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.background1 }, line: { color: "E6E0D4", width: 0.75 }, objectName: naam });
let s = pres.addSlide({ masterName: "MMM Titel" });
s.addText("Titel van de presentatie", { placeholder: "title" });
s.addText("Ondertitel, overleg of datum", { placeholder: "body" });
s.addNotes("Titeldia. De blokjes rechts zijn decoratie; laat ze staan.");

s = pres.addSlide({ masterName: "MMM Titel en inhoud" });
s.addText("WAAR GAAT HET OVER", { placeholder: "bovenkop" });
s.addText("Eén boodschap per dia", { placeholder: "title" });
s.addText([
  { text: "Zeg in de titel wat de lezer moet onthouden. De bovenkop zegt in welk deel van het verhaal je bent.", options: { bullet: { code: "25A0" }, breakLine: true } },
  { text: "Begin bij de mens: wat betekent het voor bewoners, deelnemers en cliënten?", options: { bullet: { code: "25A0" }, breakLine: true } },
  { text: "Laat het zien met een gewoon moment of een foto, niet met drie zinnen.", options: { bullet: { code: "25A0" }, breakLine: true } },
  { text: "Korte zinnen, geen uitroeptekens. Lettergrootte minimaal 18 punt.", options: { bullet: { code: "25A0" } } },
], { placeholder: "body", paraSpaceAfter: 10 });
s.addText(VOET, { placeholder: "voet" });
s.addNotes("Maak bij een presentatie voor verwanten ook een leesversie: elke dia met wat je erover vertelde.");

s = pres.addSlide({ masterName: "MMM Sectie" });
s.addText("Titel van het onderdeel", { placeholder: "title" });

s = pres.addSlide({ masterName: "MMM Alleen titel" });
s.addText("IN CIJFERS", { placeholder: "bovenkop" });
s.addText("Drie cijfers die het verhaal vertellen", { placeholder: "title" });
[["+2,5%", "Voorbeeld: stijging van een tarief", C.accent2], ["+4,0%", "Voorbeeld: stijging van de kosten", C.accent1], ["85", "Voorbeeld: aantal mensen dat we ondersteunen", C.text2]].forEach(([g, u, k], i) => {
  const x = M + i * 4.1, y = 2.1, w = 3.85, h = 2.35;
  kaart(s, x, y, w, h, "Kaart " + (i + 1));
  s.addShape(pres.shapes.RECTANGLE, { x: x + 0.3, y: y + 0.3, w: 0.2, h: 0.2, fill: { color: k }, objectName: "Blokje " + (i + 1) });
  s.addText(g, { x: x + 0.3, y: y + 0.65, w: w - 0.6, h: 0.9, fontFace: "Titillium Web", bold: true, fontSize: 44, color: C.text1, margin: 0, isTextBox: true, objectName: "Getal " + (i + 1) });
  s.addText(u, { x: x + 0.3, y: y + 1.55, w: w - 0.6, h: 0.6, fontSize: 14, color: "5C554C", margin: 0, valign: "top", isTextBox: true, objectName: "Uitleg " + (i + 1) });
});
s.addText([{ text: "Voorbeeldcijfers. ", options: { bold: true } }, { text: "Vervang ze door je eigen cijfers en noem de bron in de notities." }], { x: M, y: 4.8, w: 11.6, h: 0.5, fontSize: 14, color: C.text1, margin: 0, isTextBox: true, objectName: "Toelichting" });
s.addText(VOET, { placeholder: "voet" });

s = pres.addSlide({ masterName: "MMM Alleen titel" });
s.addText("WAAR STAAN WE", { placeholder: "bovenkop" });
s.addText("Van plan naar besluit", { placeholder: "title" });
const stappen = [["Stap 1", "Wat er gebeurde of gebeurt.", C.text2], ["Stap 2", "Kort, één of twee regels.", C.accent2], ["Stap 3", "Datum vet, uitleg eronder.", C.accent3], ["Stap 4", "Kleuren lopen door het logo.", C.accent1], ["Straks", "Wat nog niet vastligt is een voornemen.", C.accent4]];
stappen.forEach(([d, t, k], i) => {
  const x = M + i * 2.46, w = 2.26;
  s.addShape(pres.shapes.RECTANGLE, { x, y: 2.1, w, h: 0.07, fill: { color: k }, objectName: "Streep " + (i + 1) });
  s.addText(d, { x, y: 2.3, w, h: 0.4, fontFace: "Nunito", bold: true, fontSize: 16, color: C.text1, margin: 0, isTextBox: true, objectName: "Datum " + (i + 1) });
  s.addText(t, { x, y: 2.75, w, h: 1.2, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: "Stap " + (i + 1) });
});
s.addShape(pres.shapes.RECTANGLE, { x: M, y: 4.55, w: 12.13, h: 0.95, fill: { color: C.background1 }, line: { color: "E6E0D4", width: 0.75 }, objectName: "Kernboodschap vlak" });
s.addShape(pres.shapes.RECTANGLE, { x: M, y: 4.55, w: 0.05, h: 0.95, fill: { color: C.accent1 }, objectName: "Kernboodschap lijn" });
s.addText([{ text: "Kernboodschap in één zin. ", options: { bold: true } }, { text: "Daarna hooguit één zin toelichting." }], { x: M + 0.3, y: 4.55, w: 11.6, h: 0.95, fontSize: 16, color: C.text1, margin: 0, valign: "middle", isTextBox: true, objectName: "Kernboodschap tekst" });
s.addText(VOET, { placeholder: "voet" });

s = pres.addSlide({ masterName: "MMM Twee kolommen" });
s.addText("WAT BETEKENT HET", { placeholder: "bovenkop" });
s.addText("Wat verandert en wat blijft", { placeholder: "title" });
s.addText([{ text: "Wat verandert", options: { bold: true, fontFace: "Nunito", breakLine: true } }, { text: "Beschrijf hier wat er anders wordt." }], { placeholder: "links", paraSpaceAfter: 8 });
s.addText([{ text: "Wat blijft", options: { bold: true, fontFace: "Nunito", breakLine: true } }, { text: "Benoem ook wat gelijk blijft." }], { placeholder: "rechts", paraSpaceAfter: 8 });
s.addText(VOET, { placeholder: "voet" });

s = pres.addSlide({ masterName: "MMM Sectie Wonen" });
s.addText("Wonen", { placeholder: "title" });

s = pres.addSlide({ masterName: "MMM Alleen titel" });
s.addText("ONZE KLEURCODE", { placeholder: "bovenkop" });
s.addText("Elk blokje is iets wat we doen", { placeholder: "title" });
const legenda = [["Wonen", C.accent2], ["Dagbesteding", C.accent3], ["Activiteiten", C.accent4], ["Begeleiding thuis", C.accent5]];
legenda.forEach(([t, k], i) => {
  const x = M + i * 3.05;
  s.addShape(pres.shapes.RECTANGLE, { x, y: 2.2, w: 2.75, h: 2.4, fill: { color: k }, objectName: "Blokje " + t, ...(k === C.accent5 ? { line: { color: HEX.geelRand, width: 1.5 } } : {}) });
  s.addText(t, { x, y: 4.8, w: 2.75, h: 0.5, fontFace: "Nunito", bold: true, fontSize: 20, color: C.text1, margin: 0, isTextBox: true, objectName: "Label " + t });
});
s.addText(VOET, { placeholder: "voet" });
s.addNotes("Voorbeeld van de kleurcode. Zet er altijd het woord bij.");

s = pres.addSlide({ masterName: "MMM Afsluiting" });
s.addText("Vragen? [Naam, functie]\n[e-mailadres] · 046 - 4000 352", { placeholder: "body" });

(async () => {
  const uit = path.join(__dirname, "out", "MMM-presentatie.pptx");
  await pres.writeFile({ fileName: uit });
  await applyTheme(uit, THEME);
  console.log("written", uit);
})();
