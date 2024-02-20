function wrapMiddleware(shim, middleware, name, route) {
  if (shim.isWrapped(middleware)) {
    return middleware
  }

  // prefixing the segment name for middleware execution
  // with the Fastify lifecycle hook
  const segmentName = `onRequest/${name}`
  const spec = buildMiddlewareSpecForMiddlewareFunction(shim, segmentName, route)

  return shim.recordMiddleware(middleware, spec)
}