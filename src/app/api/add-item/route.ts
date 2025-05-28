import { db } from "@/lib/db";
import { JSDOM } from "jsdom";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const link = searchParams.get("link"); // e.g. `/api/search?query=hello`

  if (!link) {
    return new Response(
      JSON.stringify({ error: "Link was not passed", success: "" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }

  let html;

  try {
    const res = await fetch(link);
    html = await res.text();
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Errored while checking web address",
        success: "",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }

  const dom = new JSDOM(html);
  const document = dom.window.document;

  const sizeParents = document.querySelectorAll(
    ".product-detail-configurator-option"
  );

  if (sizeParents.length === 0) {
    return new Response(
      JSON.stringify({
        error: "No sizes we're found on this link",
        success: "",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }

  const existingLink = await db.link?.findUnique({
    where: { url: link },
  });

  if (existingLink) {
    return new Response(
      JSON.stringify({
        error: "This link already exists",
        success: "",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }

  const newLink = await db.link?.create({
    data: {
      url: link,
    },
  });

  if (!newLink) {
    return new Response(
      JSON.stringify({
        error: "Errored while making link",
        success: "",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }

  return new Response(
    JSON.stringify({ error: "", success: "Successfully added your link" }),
    {
      headers: { "Content-Type": "application/json" },
      status: 200,
    }
  );
}
