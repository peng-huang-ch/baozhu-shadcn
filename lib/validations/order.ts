import * as z from "zod"

export const orderPatchSchema = z.object({
  apartment: z.string(),
  sector: z.string(),
  count: z.number().optional(),
  listingPrice: z.number().optional(),
  transactionPrice: z.number().optional(),
  totalTransactionPrice: z.number().optional(),
})
