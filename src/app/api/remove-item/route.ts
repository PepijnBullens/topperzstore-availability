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
  const id = searchParams.get("id");

  if (!id) {
    return new Response(
      JSON.stringify({ error: "id was not passed", success: "" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }

  const numericId = Number(id);
  if (isNaN(numericId)) {
    return new Response(
      JSON.stringify({ error: "id must be a number", success: "" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }

  const existingLink = await db.link?.findFirst({
    where: { id: numericId },
  });

  if (!existingLink) {
    return new Response(
      JSON.stringify({
        error: "This link doesn't exist",
        success: "",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }

  const deleteLink = await db.link.delete({
    where: {
      id: existingLink.id,
    },
  });

  console.log(deleteLink);

  return new Response(
    JSON.stringify({ error: "", success: "Successfully removed link" }),
    {
      headers: { "Content-Type": "application/json" },
      status: 200,
    }
  );
}
