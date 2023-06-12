import { FastifyPluginCallback } from 'fastify'
import fp from 'fastify-plugin'
import { ENV, SERVICE } from '../config'

const metaPluginCallback: FastifyPluginCallback = async (app) => {
  app
    .get('/', (_req, reply) => {
      reply.code(200).send({
        service: SERVICE.name,
        version: SERVICE.version,
        tag: ENV.DD_VERSION,
        env: ENV.DD_ENV,
        time: Date.now(),
      })
    })
    .get('/healthz', (_req, reply) => {
      reply.code(200).send('ok')
    })
}

export const metaPlugin = fp(metaPluginCallback)
