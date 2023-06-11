import { ENV } from './config'
import { app } from './app'

app
  .listen({ port: ENV.PORT, host: ENV.HOST })
  .then((address) => {
    app.swagger()
    console.log(`
      Server started on ${address}/api
      Swagger UI: ${address}/docs
    `)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
