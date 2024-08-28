"use client"

import { type Order } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "apartment",
    header: "小区",
    cell: ({ row }) => {
      const order = row.original
      return <span>{order.apartment}</span>
    },
  },
  {
    accessorKey: "sector",
    header: "板块",
  },
  {
    accessorKey: "count",
    header: "成交套数",
  },
  {
    accessorKey: "listingPrice",
    header: "挂牌价",
  },
  {
    accessorKey: "transactionPrice",
    header: "成交价(网签)",
  },
  {
    accessorKey: "totalTransactionPrice",
    header: "成交总价(网签)",
    cell: ({ row }) => {
      const order = row.original
      return (
        <span>{(order.totalTransactionPrice / 10000).toLocaleString()}</span>
      )
    },
  },
  {
    accessorKey: "transactionAt",
    header: "成交时间",
    cell: ({ row }) => {
      const order = row.original
      return <span>{format(order.transactionAt, "dd/MM/yyyy")}</span>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order.id)}
            >
              Copy order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View order details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
