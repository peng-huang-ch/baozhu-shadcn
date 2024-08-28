import { Prisma } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"

const orderCreateSchema = z.object({
  district: z.string(),
  apartment: z.string(),
  sector: z.string(),
  count: z.number(),
  listingPrice: z.number().optional(),
  transactionPrice: z.number(),
  totalTransactionPrice: z.number(),
  transactionAt: z.date(),
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get("q")
    const page = Number(searchParams.get("page") || 1)
    const perPage = Number(searchParams.get("perPage") || 5)
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }
    const { user } = session
    const where: Prisma.OrderWhereInput = {}
    if (q) {
      where.apartment = {
        startsWith: q,
        mode: "insensitive",
      }
    }
    const [data, meta] = await db.order
      .paginate({
        where,
      })
      .withPages({
        limit: perPage,
        page,
        includePageCount: true,
      })
    return new Response(JSON.stringify({ data, meta }))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await req.json()
    const body = orderCreateSchema.parse(json)
    const order = await db.order.create({
      data: {
        district: body.district,
        apartment: body.apartment,
        sector: body.sector,
        count: body.count,
        listingPrice: body.listingPrice,
        transactionPrice: body.transactionPrice,
        totalTransactionPrice: body.totalTransactionPrice,
        transactionAt: body.transactionAt,
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(order))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof RequiresProPlanError) {
      return new Response("Requires Pro Plan", { status: 402 })
    }

    return new Response(null, { status: 500 })
  }
}
