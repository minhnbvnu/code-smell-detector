function wrapAllMiddleware({ routeIdx, middlewares, shim, spec, route }) {
  for (let i = 0; i < middlewares.length; ++i) {
    // If this argument is the route argument skip it.
    if (i === routeIdx) {
      continue
    }

    // Some platforms accept an arbitrarily nested array of middlewares,
    // so if this argument is an array we must recurse into it.
    const middleware = middlewares[i]
    if (middleware instanceof Array) {
      wrapAllMiddleware({ middlewares: middleware, shim, spec, route })
      continue
    }

    middlewares[i] = spec.wrapper.call(this, shim, middleware, shim.getName(middleware), route)
  }
}