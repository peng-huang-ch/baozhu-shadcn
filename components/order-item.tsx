import Link from "next/link"
import { Order } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { OrderOperations } from "@/components/order-operations"

interface OrderItemProps {
  order: Order
}

export function OrderItem({ order }: OrderItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${order.id}`}
          className="font-semibold hover:underline"
        >
          {order.apartment}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(order.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <OrderOperations order={{ id: order.id, title: order.apartment }} />
    </div>
  )
}

OrderItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
