import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
const prisma = new PrismaClient();
async function main() {
  const password = await hash("admin", 10);

  const pepijnbullens = await prisma.user.upsert({
    where: { email: "pepijn@bullens.nl" },
    update: {},
    create: {
      email: "pepijn@bullens.nl",
      username: "pepijnbullens",
      password: password,
    },
  });

  console.log(pepijnbullens);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
