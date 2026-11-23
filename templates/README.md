# Sjablonen

| Bestand | Wat |
| --- | --- |
| `MMM-brief.dotx` | Brief met logo, adresblok, datum en onderwerp, en de vaste voetregel |
| `MMM-notitie.dotx` | Notitie voor bestuur, MT, RvT, OR of cliëntenraad, met een vaste opbouw en een blok over medezeggenschap |
| `MMM-beleidsstuk.dotx` | Beleidsstuk met voorblad, inhoudsopgave, vaste hoofdstukken en versiebeheer |
| `MMM-presentatie.potx` | PowerPoint met eigen indelingen: titel, onderdeel (algemeen en per soort aanbod), titel en inhoud, twee kolommen, alleen titel, afsluiting; met voorbeelddia's voor kerncijfers, een tijdlijn en een kernboodschap |
| `email/MMM-handtekening.html` | E-mailhandtekening zonder afbeeldingen (zie `email/README.md`) |

## Gebruiken

- **Zelf**: dubbelklik op een `.dotx` of `.potx`; Word of PowerPoint maakt dan een nieuw document op basis van het sjabloon.
- **Voor iedereen (aanbevolen)**: zet de sjablonen in een SharePoint-bibliotheek en maak daar een organisatie-assetbibliotheek van voor Office-sjablonen. Dan staan ze in Word en PowerPoint onder Nieuw. De beheerder doet dat eenmalig met `Add-SPOOrgAssetsLibrary -LibraryUrl <url> -OrgAssetType OfficeTemplateLibrary`.

In de sjablonen staan stijlen klaar: Titel, Kop 1 t/m 3, Bovenkop, Kernboodschap, Instructie (grijze cursieve uitleg die je weghaalt), Klein en Label. Gebruik die in plaats van zelf opmaak te kiezen. In PowerPoint kies je een indeling via Nieuwe dia.

## Letters

De sjablonen gebruiken Titillium Web, Nunito en Atkinson Hyperlegible Next. Zijn die niet geïnstalleerd, dan kiest Office een vervanger en ziet het er anders uit. Installeer ze daarom op alle werkplekken: de bestanden staan in `../skills/mmm-huisstijl/fonts/ttf/` (vrije licentie). Via Intune zijn ze in één keer uit te rollen.

## Opnieuw maken

De sjablonen zijn gemaakt met `source/make-word.js` (npm-pakket `docx`) en `source/make-pptx.js` (`pptxgenjs`). Na een wijziging draai je beide scripts; daarna zet je de `.docx`/`.pptx` om naar `.dotx`/`.potx` door in `[Content_Types].xml` `document.main+xml` te vervangen door `template.main+xml` (Word) en `presentation.main+xml` door `template.main+xml` (PowerPoint).
