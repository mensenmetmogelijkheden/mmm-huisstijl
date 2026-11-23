/*
 * MMM house style for SharePoint pages and page templates.
 *
 * Applies the brand layer to modern SharePoint pages:
 * - the title area becomes the indigo colour header with floating blocks
 *   (layout "full-width image", no gradient, decorative image);
 * - the brand strip (six logo colours) sits directly under the header and,
 *   in its own full-width section, at the bottom of the page;
 * - a "back to the previous page" link in the table of contents loses any leading emoji;
 * - the page thumbnail becomes the colour header.
 * Page text is never changed. Running the script again on a page that is already
 * in house style changes nothing.
 *
 * How to use: open the intranet site in the browser as a site owner, open the developer
 * console (F12), paste this whole file and press Enter. By default it only reports what
 * it would change (DRY_RUN = true). Set DRY_RUN to false and run it again to save.
 * Pages that were published are published again; drafts (such as news templates) stay drafts.
 *
 * The script only calls the SharePoint REST API of the current site, with your own session.
 * It expects the two images from this folder in the site's asset library (ASSET_FOLDER);
 * upload them there first if they are missing.
 */

// Server-relative URL of the site; '' for the root site.
const MMM_SITE = '';
// Pages relative to the site.
const MMM_PAGES = [
  'SitePages/Sjablonen/Beleids-document-sjabloon.aspx',
  'SitePages/Sjablonen/Nieuwsbericht-Algemeen.aspx',
  'SitePages/Sjablonen/Nieuwsbericht-P&O.aspx',
  'SitePages/Sjablonen/Nieuwsbericht-kwaliteit-&-veiligheid.aspx',
  'SitePages/Sjablonen/Nieuwsbericht-Opleidingen.aspx',
  'SitePages/Sjablonen/Nieuwsbericht-Extern.aspx',
];
const MMM_DRY_RUN = true;
const MMM_ASSET_FOLDER = 'SiteAssets/Huisstijl';
const MMM_HEADER = { file: 'mmm-kleurkop-indigo.png', width: 2400, height: 560 };
const MMM_STRIP = { file: 'mmm-merkstrip.png', width: 1800, height: 12 };

const MMM_TITLE_WEBPART = 'cbe7b0a9-3504-44dd-a3a3-0e5cacd07788';
const MMM_IMAGE_WEBPART = 'd1d91016-032f-456d-98a4-721247c305e8';

// Pure transformation of a page's canvas (and title area in the page layout, if the title
// is not in the canvas). Mutates both and returns a list of what it changed.
// assets: { header: {url, meta}, strip: {url, meta} } with meta = {siteId, webId, listId, uniqueId}.
function mmmApplyBrandLayer(canvas, layout, assets) {
  const changes = [];
  const positioned = () => canvas.filter((c) => c.position);
  const isStrip = (c) =>
    c.webPartId === MMM_IMAGE_WEBPART &&
    String(c.webPartData?.serverProcessedContent?.imageSources?.imageSource || '').endsWith('/' + MMM_STRIP.file);
  const insertBeforeTrailing = (part) => {
    // The control without a position (page settings) stays last.
    const idx = canvas.findIndex((c) => !c.position);
    if (idx >= 0) canvas.splice(idx, 0, part);
    else canvas.push(part);
  };
  const stripPart = (position) => {
    const id = crypto.randomUUID();
    const m = assets.strip.meta;
    return {
      position,
      id,
      controlType: 3,
      isFromSectionTemplate: false,
      addedFromPersistedData: true,
      webPartId: MMM_IMAGE_WEBPART,
      webPartData: {
        id: MMM_IMAGE_WEBPART,
        instanceId: id,
        title: 'Afbeelding',
        description: 'Merkstrip MMM',
        audiences: [],
        hideOn: [],
        serverProcessedContent: {
          htmlStrings: {},
          searchablePlainTexts: { captionText: '' },
          imageSources: { imageSource: assets.strip.url },
          links: {},
          customMetadata: { imageSource: { ...m, width: MMM_STRIP.width, height: MMM_STRIP.height, imgWidth: MMM_STRIP.width, imgHeight: MMM_STRIP.height } },
        },
        dataVersion: '1.11',
        properties: {
          imageSourceType: 2,
          altText: '',
          overlayText: '',
          fileName: MMM_STRIP.file,
          ...m,
          imgWidth: MMM_STRIP.width,
          imgHeight: MMM_STRIP.height,
          fixAspectRatio: false,
          captionText: '',
          alignment: 'Center',
          isDecorative: true,
        },
      },
    };
  };
  const newSection = (zoneIndex) => ({ layoutIndex: 1, zoneIndex, zoneId: crypto.randomUUID(), sectionIndex: 1, sectionFactor: 0, controlIndex: 1 });

  // 1. Colour header in the title area.
  const titlePart = canvas.find((c) => c.webPartId === MMM_TITLE_WEBPART);
  const titleData = titlePart ? titlePart.webPartData : (layout || []).find((l) => l.id === MMM_TITLE_WEBPART);
  if (!titleData) {
    changes.push('no title area found: header skipped');
  } else {
    const p = titleData.properties || (titleData.properties = {});
    const spc = titleData.serverProcessedContent || (titleData.serverProcessedContent = {});
    // SharePoint stores the image metadata with lower-case keys and string values: compare loosely.
    const storedMeta = Object.fromEntries(
      Object.entries(spc.customMetadata?.imageSource || {}).map(([k, v]) => [k.toLowerCase(), String(v).toLowerCase()]),
    );
    const headerOk =
      p.layoutType === 'FullWidthImage' &&
      p.imageSourceType === 2 &&
      p.enableGradientEffect === false &&
      p.isDecorative === true &&
      spc.imageSources?.imageSource === assets.header.url &&
      storedMeta.uniqueid === String(assets.header.meta.uniqueId).toLowerCase();
    if (!headerOk) {
      p.layoutType = 'FullWidthImage';
      p.imageSourceType = 2;
      p.enableGradientEffect = false;
      p.isDecorative = true;
      p.translateX = 50;
      p.translateY = 50;
      delete p.encodedImage;
      spc.imageSources = { imageSource: assets.header.url };
      spc.customMetadata = { imageSource: { ...assets.header.meta, width: MMM_HEADER.width, height: MMM_HEADER.height } };
      changes.push('colour header set');
    }
  }

  // 2. Brand strip directly under the header.
  if (titlePart) {
    const section = positioned().filter(
      (c) => c.position.zoneIndex === titlePart.position.zoneIndex && c.position.sectionIndex === titlePart.position.sectionIndex,
    );
    if (!section.some(isStrip)) {
      const last = section[section.length - 1];
      const controlIndex = Math.max(...section.map((c) => c.position.controlIndex || 1)) + 1;
      canvas.splice(canvas.indexOf(last) + 1, 0, stripPart({ ...titlePart.position, controlIndex }));
      changes.push('brand strip under the header added');
    }
  } else if (titleData) {
    // Title area is above the canvas: the strip gets its own full-width section at the top.
    const zones = positioned().map((c) => c.position.zoneIndex);
    const top = Math.min(...zones);
    const topParts = positioned().filter((c) => c.position.zoneIndex === top);
    if (!(topParts.length && topParts.every(isStrip))) {
      const part = stripPart(newSection(zones.length ? top - 0.5 : 1));
      canvas.unshift(part);
      changes.push('brand strip under the header added');
    }
  }

  // 3. Brand strip in its own full-width section at the bottom.
  {
    const zones = positioned().map((c) => c.position.zoneIndex);
    const bottom = zones.length ? Math.max(...zones) : 0;
    const bottomParts = positioned().filter((c) => c.position.zoneIndex === bottom);
    if (!(bottomParts.length && bottomParts.every(isStrip))) {
      insertBeforeTrailing(stripPart(newSection(bottom + 1)));
      changes.push('brand strip at the bottom added');
    }
  }

  // 4. Back link in the table of contents without emoji.
  for (const c of canvas) {
    const p = c.webPartData?.properties;
    if (p && typeof p.previousPageText === 'string') {
      const clean = p.previousPageText.replace(/^[^\p{L}\p{N}]+/u, '');
      if (clean !== p.previousPageText) {
        p.previousPageText = clean;
        changes.push('emoji removed from back link');
      }
    }
  }
  return changes;
}

async function mmmApplyHouseStyle({ dryRun = MMM_DRY_RUN, pages = MMM_PAGES } = {}) {
  const accept = { Accept: 'application/json;odata=nometadata' };
  const api = async (path, init = {}) => {
    const res = await fetch(MMM_SITE + '/_api/' + path, { ...init, headers: { ...accept, ...(init.headers || {}) } });
    const text = await res.text();
    if (!res.ok) throw new Error(`${res.status} on ${path.split('?')[0]}: ${text.slice(0, 200)}`);
    return text ? JSON.parse(text) : {};
  };
  // Parameter aliases keep characters such as & and ' in file names safe.
  const byPath = (fn, path, select) =>
    `web/${fn}(decodedurl=@p)?@p='${encodeURIComponent(path.replace(/'/g, "''"))}'${select ? '&' + select : ''}`;

  const web = await api('web?$select=Id,ServerRelativeUrl');
  const site = await api('site?$select=Id');
  const root = web.ServerRelativeUrl.replace(/\/$/, '');
  const full = (rel) => `${root}/${rel}`;
  const assetList = await api(`web/GetList(@p)?@p='${encodeURIComponent(full(MMM_ASSET_FOLDER.split('/')[0]))}'&$select=Id`);
  const asset = async (file) => {
    const url = full(`${MMM_ASSET_FOLDER}/${file}`);
    let f;
    try {
      f = await api(byPath('GetFileByServerRelativePath', url, '$select=UniqueId'));
    } catch (e) {
      throw new Error(`Image ${url} not found. Upload ${file} from the repo to ${MMM_ASSET_FOLDER} first.`);
    }
    return { url, meta: { siteId: site.Id, webId: web.Id, listId: `{${assetList.Id}}`, uniqueId: f.UniqueId } };
  };
  const assets = { header: await asset(MMM_HEADER.file), strip: await asset(MMM_STRIP.file) };
  const digest = dryRun ? null : (await api('contextinfo', { method: 'POST' })).FormDigestValue;
  const post = (path, body) =>
    api(path, {
      method: 'POST',
      headers: { 'X-RequestDigest': digest, 'Content-Type': 'application/json;odata=nometadata' },
      body: body ? JSON.stringify(body) : undefined,
    });

  const report = [];
  for (const rel of pages) {
    try {
      const file = await api(byPath('GetFileByServerRelativePath', full(rel), '$select=Level&$expand=ListItemAllFields'));
      const id = file.ListItemAllFields.Id;
      const page = await api(`sitepages/pages(${id})?$select=Title,CanvasJson1,LayoutWebpartsContent`);
      const canvas = JSON.parse(page.CanvasJson1 || '[]');
      let layout = null;
      try {
        layout = JSON.parse(page.LayoutWebpartsContent);
      } catch (e) {
        layout = null;
      }
      if (!Array.isArray(layout)) layout = null;
      const changes = mmmApplyBrandLayer(canvas, layout, assets);
      if (!changes.length) {
        report.push({ page: rel, result: 'already in house style' });
        continue;
      }
      if (dryRun) {
        report.push({ page: rel, result: 'would change: ' + changes.join('; ') });
        continue;
      }
      await post(`sitepages/pages(${id})/checkoutpage`);
      const body = { Title: page.Title, CanvasContent1: JSON.stringify(canvas), BannerImageUrl: assets.header.url };
      if (layout) body.LayoutWebpartsContent = JSON.stringify(layout);
      await post(`sitepages/pages(${id})/savepageasdraft`, body);
      // Level 1 = published: publish again, so readers see the change. Drafts stay drafts.
      if (file.Level === 1) await post(`sitepages/pages(${id})/publish`);
      report.push({ page: rel, result: 'changed: ' + changes.join('; ') + (file.Level === 1 ? ' (published)' : ' (draft)') });
    } catch (e) {
      report.push({ page: rel, result: 'error: ' + e.message });
    }
  }
  console.table(report);
  return report;
}

mmmApplyHouseStyle();
