import { FastifyPluginCallback } from 'fastify'
import fp from 'fastify-plugin'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { fastifyTRPCOpenApiPlugin, generateOpenApiDocument } from 'trpc-openapi'

import { SERVICE } from '../config'
import { appRouter } from './router'
import { createContext } from './builder'

const openApiDocument = generateOpenApiDocument(appRouter, {
  title: SERVICE.name,
  version: SERVICE.version,
  baseUrl: '/api',
})

const apiPluginCallback: FastifyPluginCallback = async (app) => {
  app
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
}

export const apiPlugin = fp(apiPluginCallback)
