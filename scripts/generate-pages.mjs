import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

const outputDirectory = path.resolve("dist/public");
const shellPath = path.join(outputDirectory, "index.html");
const publicRoot = "https://abssothman.github.io/ZanHub-Lab";
const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}[character]));

const shell = await readFile(shellPath, "utf8");
const vite = await createServer({
  appType: "custom",
  logLevel: "error",
  server: { middlewareMode: true },
});

try {
  const [{ default: Page }, { siteCopy, sitePagePaths }] = await Promise.all([
    vite.ssrLoadModule("/src/pages/Home.tsx"),
    vite.ssrLoadModule("/src/lib/siteCopy.ts"),
  ]);
  const copy = siteCopy.en;

  const pages = Object.keys(sitePagePaths);

  for (const page of pages) {
    const routePath = sitePagePaths[page];
    const slug = routePath === "/" ? "" : routePath.slice(1);
    const canonicalUrl = `${publicRoot}${routePath === "/" ? "/" : `${routePath}/`}`;
    const title = copy.pageTitles[page];
    const description = copy.pageDescriptions[page];
    const htmlBody = renderToString(createElement(Page, { page }));
    const headMetadata = [
      `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:title" content="${escapeHtml(title)}" />`,
      `<meta property="og:description" content="${escapeHtml(description)}" />`,
      `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
      `<meta property="og:site_name" content="ZanHR Lab" />`,
      `<meta property="og:image" content="${publicRoot}/zanhr-lab-logo.png" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
      `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
      `<meta name="twitter:image" content="${publicRoot}/zanhr-lab-logo.png" />`,
    ].join("\n    ");
    const pageHtml = shell
      .replace(/<html lang="[^"]*">/, '<html lang="en">')
      .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
      .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escapeHtml(description)}" />`)
      .replace("</head>", `    ${headMetadata}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${htmlBody}</div>`);

    const destination = slug
      ? path.join(outputDirectory, slug, "index.html")
      : shellPath;
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, pageHtml);
  }

  console.log(`Generated ${pages.length} route entry points with server-rendered English content.`);
} finally {
  await vite.close();
}
