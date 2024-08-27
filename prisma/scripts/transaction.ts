import { createReadStream } from "node:fs"
import path from "node:path"
import { Order, Prisma, PrismaClient } from "@prisma/client"
import { parse, parser } from "csv"

const prisma = new PrismaClient()

/**
 * 从文件中读取数据
 * @param filepath 文件路径
 * @returns 数据
 */
async function readFromFile<T>(filepath: string): Promise<T[]> {
  const rows: T[] = []
  const parser = parse({
    columns: true,
    skip_empty_lines: true,
  })
  return new Promise((resolve, reject) => {
    createReadStream(filepath)
      .pipe(parser)
      .on("data", (row) => rows.push(row))
      .on("end", () => resolve(rows))
      .on("error", (error) => reject(error))
  })
}

function getOrder(
  district: string,
  transactionAt: Date,
  item: Order
): Prisma.OrderCreateManyInput {
  const totalTransactionPrice = item["成交总价(网签)"]
  return {
    apartment: item["小区"],
    sector: item["板块"],
    count: Number(item["成交套数"]),
    listingPrice: Number(item["挂牌价"] || -1),
    transactionPrice: Number(item["成交价(网签)"] || -1),
    totalTransactionPrice: Number(
      totalTransactionPrice.replace("万", "") * 10000
    ),
    district,
    transactionAt,
  }
}

async function main(): Promise<void> {
  const district = "长宁"
  const transactionAt = new Date("2024-7-31")
  const filepath = path.join(process.cwd(), "data.csv")
  const data = await readFromFile<Order>(filepath)
  const orders: Prisma.OrderCreateManyInput[] = data.map((item) =>
    getOrder(district, transactionAt, item)
  )
  await prisma.order.createMany({
    data: orders,
    skipDuplicates: true,
  })
  console.log("数据插入成功")
  // 小区,板块,成交套数,挂牌价,成交价(网签),成交总价(网签)
}

main().catch(console.error)
