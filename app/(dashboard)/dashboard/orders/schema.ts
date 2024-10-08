import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const orderSchema = z.object({
  id: z.string(),
  district: z.string(),
  apartment: z.string(),
  sector: z.string(),
  count: z.number(),
  listingPrice: z.number().optional().nullable(),
  transactionPrice: z.number(),
  totalTransactionPrice: z.number(),
  transactionAt: z.string().transform((value) => new Date(value)),
})
export type Order = z.infer<typeof orderSchema>
