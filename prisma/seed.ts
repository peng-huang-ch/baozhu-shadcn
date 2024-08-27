import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)
  const data = [
    {
      id: "1",
      name: "BaoZhu",
      email: "h499871809@gmail.com",
    },
  ]
  await prisma.user.createMany({
    data,
    skipDuplicates: true,
  })

  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
