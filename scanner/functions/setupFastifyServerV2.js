function setupFastifyServerV2(fastify, calls) {
  common.setupRoutes(fastify)
  common.registerMiddlewares({ fastify, calls })
}