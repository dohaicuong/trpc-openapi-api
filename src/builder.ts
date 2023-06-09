import { initTRPC } from '@trpc/server'
import { OpenApiMeta } from 'trpc-openapi'
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'
import { v4 as uuid } from 'uuid'
import { FastifyRequest } from 'fastify'

type Context = {
  req: FastifyRequest
}
export const createContext = async ({ req, res }: CreateFastifyContextOptions): Promise<Context> => {
  const requestId = uuid()
  res.header('x-request-id', requestId)

  return { req }
}

export const t = initTRPC
  .meta<OpenApiMeta>()
  .context<Context>()
  .create()
