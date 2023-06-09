import { z } from 'zod'
import { t } from '../../builder'
import { isAuth } from '../../middlewares/isAuth'

export const userRouter = t.router({
  get_user: t.procedure
    .meta({
      openapi: {
        method: 'GET',
        path: '/user',
        protect: true,
      },
    })
    .use(isAuth)
    .input(z.object({}))
    .output(
      z.object({
        id: z.number(),
        name: z.string(),
        mail: z.string(),
        roles: z.array(z.string()),
        accounts: z.array(
          z.object({
            id: z.number(),
            instance: z.string(),
            profile_id: z.number(),
            name: z.string(),
            roles: z.array(z.string()),
            portal_id: z.number(),
            ulid: z.string(),
          }),
        ),
      }),
    )
    .query(({ ctx }) => ctx.jwt.payload.object.content),
})
