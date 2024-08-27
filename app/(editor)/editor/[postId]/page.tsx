import { notFound, redirect } from "next/navigation"
import { Order, User } from "@prisma/client"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Editor } from "@/components/editor"

async function getOrder(orderId: Order["id"]) {
  return await db.order.findFirst({
    where: {
      id: orderId,
    },
  })
}

interface EditorPageProps {
  params: { orderId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const order = await getOrder(params.orderId)

  if (!order) {
    notFound()
  }

  return (
    <Editor
      order={{
        id: order.id,
        title: order.title,
        content: order.content,
        published: order.published,
      }}
    />
  )
}
