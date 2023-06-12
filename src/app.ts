import './tracer'
import { ENV } from './config'

import fastify from 'fastify'
import { v4 as uuid } from 'uuid'

import cors from '@fastify/cors'
import compress from '@fastify/compress'
import { apiPlugin } from './api'
import { metaPlugin } from './meta'

export const app = fastify({
  logger: ENV.NODE_ENV !== 'test',
  genReqId: () => uuid(),
})
  .register(cors)
  .register(compress, {
    requestEncodings: ['gzip'],
  })
  .register(metaPlugin)
  .register(apiPlugin)
