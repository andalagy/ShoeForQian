import fs from "node:fs";
import path from "node:path";
import Script from "next/script";

function readCheckoutHtml() {
  return fs.readFileSync(path.join(/*turbopackIgnore: true*/ process.cwd(), "checkout.html"), "utf8");
}

function extractMain(html: string) {
  const match = html.match(/<main[\s\S]*?<\/main>/i);
  return match ? match[0] : "";
}

function extractInlineScript(html: string) {
  const match = html.match(/<script>([\s\S]*?)<\/script>/i);
  return match ? match[1] : "";
}

export default function CheckoutPage() {
  const html = readCheckoutHtml();
  return (
    <>
      <div className="checkout-page" dangerouslySetInnerHTML={{ __html: extractMain(html) }} />
      <Script id="checkout-selection-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: extractInlineScript(html) }} />
    </>
  );
}
