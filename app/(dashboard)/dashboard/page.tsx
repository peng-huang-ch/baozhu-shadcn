import { redirect } from "next/navigation"
import { Order } from "@prisma/client"
import type { PageNumberPaginationMeta } from "prisma-extension-pagination"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { DataTable } from "@/components/data-table"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

import { columns } from "./orders/columns"

export const metadata = {
  title: "Dashboard",
}

async function getData(
  page: number,
  perPage: number
): Promise<{
  meta: PageNumberPaginationMeta
  data: Order[]
}> {
  const where = {}
  const [data, meta] = await db.order
    .paginate({
      where,
    })
    .withPages({
      limit: perPage,
      page,
      includePageCount: true,
    })
  return { meta, data }
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
  const { data, meta } = await getData(1, 5)

  return (
    <DashboardShell>
      <DashboardHeader heading="Transactions" text="Manage transactions." />
      <div className="grid gap-10">
        <DataTable columns={columns} data={data} />
      </div>
    </DashboardShell>
  )
}
