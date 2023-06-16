import { initTRPC } from '@trpc/server'
import { OpenApiMeta } from 'trpc-openapi'
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'
import { FastifyRequest } from 'fastify'
import superjson from 'superjson'

type Context = {
  req: FastifyRequest
}
export const createContext = async ({
  req,
}: CreateFastifyContextOptions): Promise<Context> => {
  return { req }
}

export const t = initTRPC.meta<OpenApiMeta>().context<Context>().create({
  transformer: superjson,
})
