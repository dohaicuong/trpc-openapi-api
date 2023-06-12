import { FastifyPluginCallback } from 'fastify'
import fp from 'fastify-plugin'
import { ENV, SERVICE } from '../config'

const metaPluginCallback: FastifyPluginCallback = async (app) => {
  app
    .get('/', (_req, reply) => {
      reply.code(200).send({
        service: SERVICE.name,
        version: SERVICE.version,
        env: ENV.ENV,
        time: parseInt(`${new Date().getTime() / 1000}`),
      })
    })
    .get('/healthz', (_req, reply) => {
      reply.code(200).send('ok')
    })
}

export const metaPlugin = fp(metaPluginCallback)
