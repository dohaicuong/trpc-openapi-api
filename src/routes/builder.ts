import { initTRPC } from '@trpc/server'
import { OpenApiMeta } from 'trpc-openapi'
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'
import { FastifyRequest } from 'fastify'
import { db } from '../db/db'

type Context = {
  req: FastifyRequest
  db: typeof db
}
export const createContext = async ({
  req,
}: CreateFastifyContextOptions): Promise<Context> => {
  return { req, db }
}

export const t = initTRPC.meta<OpenApiMeta>().context<Context>().create()
