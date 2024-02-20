function wrapServer(serverProto) {
    // These are all the methods for mounting routed middleware.
    const routings = ['del', 'get', 'head', 'opts', 'post', 'put', 'patch']
    shim.wrapMiddlewareMounter(serverProto, routings, {
      route: shim.FIRST,
      endpoint: shim.LAST,
      wrapper: function wrapMiddleware(shim, middleware, name, route) {
        if (shim.isWrapped(middleware)) {
          return middleware
        }
        const spec = {
          matchArity: true,
          route,
          req: shim.FIRST,
          next: shim.LAST
        }

        const wrappedMw = shim.recordMiddleware(middleware, spec)
        if (middleware.constructor.name === 'AsyncFunction') {
          return async function asyncShim() {
            return wrappedMw.apply(this, arguments)
          }
        }
        return wrappedMw
      }
    })

    // These methods do not accept a route, just middleware functions.
    const mounters = ['pre', 'use']
    shim.wrapMiddlewareMounter(serverProto, mounters, function wrapper(shim, middleware) {
      if (shim.isWrapped(middleware)) {
        return middleware
      }
      const spec = {
        matchArity: true,
        req: shim.FIRST,
        next: shim.LAST
      }
      const wrappedMw = shim.recordMiddleware(middleware, spec)
      if (middleware.constructor.name === 'AsyncFunction') {
        return async function asyncShim() {
          return wrappedMw.apply(this, arguments)
        }
      }
      return wrappedMw
    })
  }