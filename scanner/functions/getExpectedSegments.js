function getExpectedSegments(uri) {
  return [
    'Nodejs/Middleware/Fastify/onRequest/runMiddie',
    [
      'Nodejs/Middleware/Fastify/onRequest/testMiddleware',
      `Nodejs/Middleware/Fastify/onRequest/pathMountedMiddleware/${uri}`
    ],
    `Nodejs/Middleware/Fastify/<anonymous>/${uri}`
  ]
}