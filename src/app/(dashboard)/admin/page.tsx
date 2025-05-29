import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import Admin from "@/components/admin";
import Link from "next/link";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const links = await db.link.findMany();

  return session?.user ? (
    <Admin links={links} />
  ) : (
    <>
      <h2>Please sign in to view this page</h2>
      <Link href="/sign-in" className="underline">
        Sign-in page
      </Link>
    </>
  );
}
