import { z } from 'zod'
import { t } from '../builder'
import { PostSchema } from './schema'
import { db } from '../../db'

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
  .output(z.array(PostSchema))
  .query(async ({ input }) => {
    return db.post.findMany({
      take: input.limit,
      skip: input.offset,
    })
  })
