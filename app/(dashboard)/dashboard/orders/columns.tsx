"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Order } from "./schema"

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "apartment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="小区" />
    ),
    cell: ({ row }) => {
      const order = row.original
      return <span>{order.apartment}</span>
    },
  },
  {
    accessorKey: "sector",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="板块" />
    ),
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
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
