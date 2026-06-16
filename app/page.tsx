import fs from "node:fs";
import path from "node:path";
import Script from "next/script";

function readRootFile(fileName: string) {
  return fs.readFileSync(path.join(/*turbopackIgnore: true*/ process.cwd(), fileName), "utf8");
}

function extractMain(html: string) {
  const match = html.match(/<main[\s\S]*?<\/main>/i);
  return match ? match[0] : "";
}

export default function Page() {
  const mainMarkup = extractMain(readRootFile("index.html"));
  const script = readRootFile("script.js");

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: mainMarkup }} />
      <Script id="the-line-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}
