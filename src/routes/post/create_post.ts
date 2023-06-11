import { z } from 'zod'
import { isAuth } from '../../middlewares/isAuth'
import { t } from '../builder'
import { db } from '../../db'
import { PostSchema } from './schema'

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
    z.object({
      title: z.string(),
      content: z.string(),
    }),
  )
  .output(PostSchema)
  .mutation(async ({ ctx, input }) => {
    const result = await db
      .insertInto('Post')
      .values({
        title: input.title,
        content: input.content,
        author_id: ctx.jwt.payload.object.content.id,
      })
      .executeTakeFirstOrThrow()

    const post = await db
      .selectFrom('Post')
      .selectAll()
      .where('Post.id', '=', Number(result.insertId))
      .execute()

    return post[0]
  })
