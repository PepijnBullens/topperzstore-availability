import { JSDOM } from "jsdom";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const size = searchParams.get("size");

  const res = await fetch(
    "https://www.topperzstore.nl/new-era-chicago-white-sox-59-years-chrome-satin-brim-two-tone-edition-59fifty-fitted-hat/NES6263-8"
  );
  const html = await res.text();

  const dom = new JSDOM(html);
  const document = dom.window.document;

  const sizeParents = document.querySelectorAll(
    ".product-detail-configurator-option"
  );

  const isAvailable = Array.from(sizeParents).some((parent) => {
    const label = parent.querySelector("label");
    const input = parent.querySelector("input");

    if (!label || label.title != size || !input) return false;

    return !input.disabled;
  });

  return new Response(JSON.stringify({ available: isAvailable }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
