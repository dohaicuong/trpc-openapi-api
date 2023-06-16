import { t } from './builder'

import { userRouter } from './user'
import { postRouter } from './post'
import { feedbackRouter } from './feedback'

export const appRouter = t.mergeRouters(userRouter, postRouter, feedbackRouter)

export type AppRouter = typeof appRouter
