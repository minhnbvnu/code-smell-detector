function wrapExpress3(shim, express) {
  // In Express 3 the app returned from `express()` is actually a `connect` app
  // which we have no access to before creation. We can not easily wrap the app
  // because there are a lot of methods dangling on it that act on the app itself.
  // Really we just care about apps being used as `request` event listeners on
  // `http.Server` instances so we'll wrap that instead.

  shim.wrapMiddlewareMounter(express.Router.prototype, 'param', {
    route: shim.FIRST,
    wrapper: function wrapParamware(shim, middleware, fnName, route) {
      return shim.recordParamware(
        middleware,
        new MiddlewareSpec({
          name: route,
          req: shim.FIRST,
          next: shim.THIRD,
          type: MIDDLEWARE_TYPE_NAMES.PARAMWARE
        })
      )
    }
  })
  shim.wrapMiddlewareMounter(
    express.Router.prototype,
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

  // NOTE: Do not wrap application route methods in Express 3, they all just
  // forward their arguments to the router.
  wrapRouteMethods(shim, express.Router.prototype, shim.FIRST)
  wrapResponse(shim, express.response)
}