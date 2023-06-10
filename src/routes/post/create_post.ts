import { t } from '../builder'
import { isAuth } from '../_middlewares/isAuth'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { posts_table } from '../../db/schema'
import { eq } from 'drizzle-orm'

export const create_post = t.procedure
  .meta({
    openapi: {
      method: 'POST',
      path: '/post',
      protect: true,
      tags: ['post'],
    },
  })
  .use(isAuth)
  .input(
    createInsertSchema(posts_table).omit({
      id: true,
      author_id: true,
    }),
  )
  .output(createSelectSchema(posts_table))
  .query(async ({ ctx, input }) => {
    const [result] = await ctx.db.insert(posts_table).values({
      ...input,
      author_id: ctx.jwt.payload.object.content.id,
    })

    const post = await ctx.db
      .select()
      .from(posts_table)
      .where(eq(posts_table.id, result.insertId))

    return post[0]
  })
