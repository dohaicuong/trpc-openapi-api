import { t } from './builder'
import { metaRouter } from './routes/meta'
import { userRouter } from './routes/user'

export const appRouter = t.mergeRouters(
  metaRouter,
  userRouter,
)

export type AppRouter = typeof appRouter
