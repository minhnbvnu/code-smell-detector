function wrapExpress4(shim, express) {
  // Wrap `use` and `route` which are hung off `Router` directly, not on a
  // prototype.
  shim.wrapMiddlewareMounter(
    express.Router,
    'use',
    new MiddlewareMounterSpec({
      route: shim.FIRST,
      wrapper: wrapMiddleware
    })
  )

  shim.wrapMiddlewareMounter(
    express.application,
    'use',
    new MiddlewareMounterSpec({
      route: shim.FIRST,
      wrapper: wrapMiddleware
    })
  )

  shim.wrap(express.Router, 'route', function wrapRoute(shim, fn) {
    if (!shim.isFunction(fn)) {
      return fn
    }

    return function wrappedRoute() {
      const route = fn.apply(this, arguments)

      // Express should create a new route and layer every time Router#route is
      // called, but just to be on the safe side, make sure we haven't wrapped
      // this already.
      if (!shim.isWrapped(route, 'get')) {
        wrapRouteMethods(shim, route, '')

        const layer = this.stack[this.stack.length - 1]

        // This wraps a 'done' function but not a traditional 'next' function. This allows
        // the route to stay on the stack for middleware nesting after the router.
        // The segment will be automatically ended by the http/https instrumentation.
        shim.recordMiddleware(
          layer,
          'handle',
          new MiddlewareSpec({
            type: shim.ROUTE,
            req: shim.FIRST,
            next: shim.LAST,
            matchArity: true,
            route: route.path
          })
        )
      }
      return route
    }
  })

  shim.wrapMiddlewareMounter(express.Router, 'param', {
    route: shim.FIRST,
    wrapper: function wrapParamware(shim, middleware, fnName, route) {
      return shim.recordParamware(
        middleware,
        new MiddlewareSpec({
          name: route,
          req: shim.FIRST,
          next: shim.THIRD
        })
      )
    }
  })

  wrapResponse(shim, express.response)
}