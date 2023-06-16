import { z } from 'zod'
import { isAuth } from '../__middlewares/isAuth'
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
  .use(
    isAuth({
      userRoles: [],
      accountRoles: [],
    }),
  )
  .input(
    z.object({
      title: z.string(),
      content: z.string(),
    }),
  )
  .output(PostSchema)
  .mutation(async ({ ctx, input }) => {
    return db.post.create({
      data: {
        ...input,
        author_id: ctx.jwt.payload.object.content.id,
      },
    })
  })
