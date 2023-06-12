import { t } from './builder'

import { userRouter } from './user'
import { postRouter } from './post'

export const appRouter = t.mergeRouters(userRouter, postRouter)

export type AppRouter = typeof appRouter
