import { z } from 'zod'
import { t } from '../../builder'

import { ENV, SERVICE } from '../../config'

export const metaRouter = t.router({
  getMeta: t.procedure
    .meta({
      openapi: {
        method: 'GET',
        path: '/',
      },
    })
    .input(z.object({}))
    .output(z.object({
      service: z.string(),
      version: z.string(),
      env: z.string(),
      // tag: z.string(),
      time: z.number(),
    }))
    .query(() => ({
      service: SERVICE.name,
      version: SERVICE.version,
      env: ENV.ENV,
      time: parseInt(`${new Date().getTime() / 1000}`)
    }))
})