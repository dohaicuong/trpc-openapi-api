import { z } from 'zod'
import { t } from '../builder'
import { createSelectSchema } from 'drizzle-zod'
import { posts_table } from '../../db/schema'

export const get_posts = t.procedure
  .meta({
    openapi: {
      method: 'GET',
      path: '/posts',
      protect: true,
      tags: ['post'],
    },
  })
  .input(
    z.object({
      limit: z.number().max(100).default(50),
      offset: z.number().default(0),
    }),
  )
  .output(z.array(createSelectSchema(posts_table)))
  .query(async ({ input, ctx }) => {
    return ctx.db
      .select()
      .from(posts_table)
      .limit(input.limit)
      .offset(input.offset)
  })
