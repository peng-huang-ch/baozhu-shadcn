import { DashboardHeader } from "@/components/header"
import { OrderCreateButton } from "@/components/order-create-button"
import { OrderItem } from "@/components/order-item"
import { DashboardShell } from "@/components/shell"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Orders" text="">
        <OrderCreateButton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <OrderItem.Skeleton />
        <OrderItem.Skeleton />
        <OrderItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
