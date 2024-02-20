function setupMiddlewareHandlers(shim, fastify, isv3Plus) {
  const mounterSpec = {
    route: shim.FIRST,
    wrapper: wrapMiddleware
  }

  if (isv3Plus) {
    // Fastify v3+ does not ship with traditional Node.js middleware mounting.
    // This style is accomplished leveraging decorators. Both middie (which was built-in in v2)
    // and fastify-express mount a 'use' function for mounting middleware.
    shim.wrap(fastify, 'decorate', function wrapDecorate(shim, fn) {
      return function wrappedDecorate() {
        const name = arguments[0]
        if (name !== 'use') {
          return fn.apply(this, arguments)
        }

        const args = shim.argsToArray.apply(shim, arguments)
        args[1] = shim.wrapMiddlewareMounter(args[1], mounterSpec)

        return fn.apply(this, args)
      }
    })
  } else {
    shim.wrapMiddlewareMounter(fastify, 'use', mounterSpec)
  }
}