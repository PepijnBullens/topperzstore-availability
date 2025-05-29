import { db } from "@/lib/db";
import { JSDOM } from "jsdom";
import { NextRequest } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new Response(
      JSON.stringify({ error: "You are not authorized", success: "" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 401,
      }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const link = searchParams.get("link");

  if (!link) {
    return new Response(
      JSON.stringify({ error: "Link was not passed", success: "" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
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
        success: "",
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
        success: "",
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

  const name = document.querySelector(".product-detail-name")?.textContent;
  if (!name) {
    return new Response(
      JSON.stringify({
        error: "Could not fetch the product name from the link",
        success: "",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }

  const price = document.querySelector(".product-detail-price")?.textContent;
  if (!price) {
    return new Response(
      JSON.stringify({
        error: "Could not fetch the product price from the link",
        success: "",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }

  const ogImageMeta = document.querySelector('meta[property="og:image"]');
  const src = ogImageMeta?.getAttribute("content");
  if (!src) {
    return new Response(
      JSON.stringify({
        error: "Could not fetch the product image from the link",
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
      name: name,
      price: price,
      image: src,
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

  const links = await db.link.findMany();

  return new Response(
    JSON.stringify({
      links: links,
      error: "",
      success: "Successfully added your link",
    }),
    {
      headers: { "Content-Type": "application/json" },
      status: 200,
    }
  );
}
