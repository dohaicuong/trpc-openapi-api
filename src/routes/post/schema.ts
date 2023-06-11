import { z } from 'zod'

export const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  author_id: z.number(),
  createdAt: z.preprocess(
    (val) => (val instanceof Date ? val.toISOString() : val),
    z.string().datetime(),
  ),
})
