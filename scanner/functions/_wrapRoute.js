function _wrapRoute(shim, route, prefix) {
  const routePath = prefix + route.path
  if (shim.isArray(route)) {
    for (let i = 0; i < route.length; ++i) {
      _wrapRoute(shim, route[i], prefix)
    }
    return
  } else if (route.options) {
    // v17 now prefers `options` property...
    if (route.options.pre) {
      // config objects can also contain multiple OTHER handlers in a `pre` array
      route.options.pre = wrapPreHandlers(shim, route.options.pre, routePath)
    }
    if (route.options.handler) {
      _wrapRouteHandler(shim, route.options, routePath)
      return
    }
  } else if (route.config) {
    // ... but `config` still works
    if (route.config.pre) {
      route.config.pre = wrapPreHandlers(shim, route.config.pre, routePath)
    }
    if (route.config.handler) {
      _wrapRouteHandler(shim, route.config, routePath)
      return
    }
  }
  _wrapRouteHandler(shim, route, routePath)
}