import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import Admin from "@/components/admin";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const links = await db.link.findMany();

  return session?.user ? (
    <>
      <p>Welcome {session?.user.username}</p>
      <Admin links={links} />
    </>
  ) : (
    <h2>Please sign in to view this page</h2>
  );
}
