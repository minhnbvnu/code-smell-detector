async function setupFastifyServer(fastify, calls) {
  common.setupRoutes(fastify)
  await fastify.register(require('middie'))
  common.registerMiddlewares({ fastify, calls })
}