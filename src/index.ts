import fastify from 'fastify'
import cors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { fastifyTRPCOpenApiPlugin, generateOpenApiDocument } from 'trpc-openapi'

import { appRouter } from './router'
import { createContext } from './builder'
import { ENV, SERVICE } from './config'

const app = fastify({ logger: true })

async function main() {
  await app.register(cors)

  const openApiDocument = generateOpenApiDocument(appRouter, {
    title: SERVICE.name,
    version: SERVICE.version,
    baseUrl: 'http://localhost:3000/api',
    docsUrl: 'http://localhost:3000/docs'
  })
  await app
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
        displayOperationId: true
      },
    })

  await app
    .listen({ port: ENV.PORT, host: ENV.HOST })
    .then((address) => {
      app.swagger()
      console.log(`
        Server started on ${address}/api
        Swagger UI: http://localhost:3000/docs
      `)
    })
    .catch((e) => {
      throw e
    })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
