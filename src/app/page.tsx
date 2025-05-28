import Main from "@/components/main";
import { db } from "@/lib/db";

export default async function Home() {
  const links = await db.link.findMany();
  console.log(links);

  return <Main />;
}
