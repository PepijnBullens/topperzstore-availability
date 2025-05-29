import { JSDOM } from "jsdom";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const size = searchParams.get("size");
  const link = searchParams.get("url");

  if (!size) {
    return new Response(JSON.stringify({ error: "Size was not passed" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }

  if (!link) {
    return new Response(JSON.stringify({ error: "Link was not passed" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }

  let document = null;

  try {
    const res = await fetch(link);
    const html = await res.text();

    const dom = new JSDOM(html);
    document = dom.window.document;
  } catch {
    return new Response(
      JSON.stringify({
        error: "Errored while checking web address",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }

  if (document === null) {
    return new Response(
      JSON.stringify({
        error: "Errored while checking web address",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }

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
