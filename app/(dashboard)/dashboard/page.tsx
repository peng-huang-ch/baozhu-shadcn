import * as React from "react"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

import { columns } from "./orders/columns"
import { DataTable } from "./orders/data-table"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Transactions" text="Manage transactions." />
      <div className="grid gap-10">
        <DataTable columns={columns} />
      </div>
    </DashboardShell>
  )
}
