import { t } from './builder'
import { metaRouter } from './meta'
import { postRouter } from './post'
import { userRouter } from './user'

export const appRouter = t.mergeRouters(metaRouter, userRouter, postRouter)

export type AppRouter = typeof appRouter
