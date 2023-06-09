import './tracer'

import fastify from 'fastify'
import cors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { fastifyTRPCOpenApiPlugin, generateOpenApiDocument } from 'trpc-openapi'
import { v4 as uuid } from 'uuid'

import { appRouter } from './router'
import { createContext } from './builder'
import { ENV, SERVICE } from './config'

const openApiDocument = generateOpenApiDocument(appRouter, {
  title: SERVICE.name,
  version: SERVICE.version,
  baseUrl: 'http://localhost:3000/api',
  docsUrl: 'http://localhost:3000/docs',
})

export const app = fastify({
  logger: ENV.NODE_ENV !== 'test',
  genReqId: () => uuid(),
})
  .register(cors)
  .get('/openapi.json', () => openApiDocument)
  .register(fastifyTRPCOpenApiPlugin, {
    basePath: '/api',
    router: appRouter,
    createContext,
  })
  .register(fastifySwagger, {
    mode: 'static',
    specification: { document: openApiDocument },
  })
  .register(fastifySwaggerUI, {
    routePrefix: '/docs',
    uiConfig: {
      displayOperationId: true,
    },
  })
