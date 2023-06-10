import { FastifyPluginCallback } from 'fastify'
import fp from 'fastify-plugin'
import { migration } from './db'

const dbPluginCallback: FastifyPluginCallback = async (app) => {
  app.addHook('onReady', async () => {
    console.log('Running migration....')
    await migration().then(() => {
      console.log('Migration done!')
    })
  })
}

export const dbPlugin = fp(dbPluginCallback)
