import { Prisma, PrismaClient } from "@prisma/client"
import { pagination } from "prisma-extension-pagination"

const prismaOptions = {
  log: [
    { emit: "event", level: "query" },
    { emit: "stdout", level: "info" },
    { emit: "stdout", level: "warn" },
    { emit: "stdout", level: "error" },
  ],
  errorFormat: "colorless",
} as Prisma.PrismaClientOptions

export const extendedPrismaClient = new PrismaClient(prismaOptions).$extends(
  pagination()
)

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: typeof extendedPrismaClient
}

let prisma: typeof extendedPrismaClient
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient().$extends(pagination())
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = extendedPrismaClient
  }
  prisma = global.cachedPrisma
}

export const db = prisma
