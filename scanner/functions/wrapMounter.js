function wrapMounter(spec, shim, fn, fnName) {
  if (!shim.isFunction(fn)) {
    return fn
  }

  return function wrappedMounter() {
    const args = shim.argsToArray.apply(shim, arguments)

    // Normalize the route index and pull out the route argument if provided.
    let routeIdx = null
    let route = null
    if (shim.isNumber(spec.route)) {
      routeIdx = shim.normalizeIndex(args.length, spec.route)
      route = routeIdx === null ? null : args[routeIdx]
      const isArrayOfFunctions = shim.isArray(route) && shim.isFunction(route[0])
      if (shim.isFunction(route) || isArrayOfFunctions) {
        routeIdx = null
        route = null
      } else if (shim.isArray(route)) {
        route = route.map((routeArg) => {
          return shim._routeParser.call(this, shim, fn, fnName, routeArg)
        })
      } else {
        route = shim._routeParser.call(this, shim, fn, fnName, route)
      }
    } else if (spec.route !== null) {
      route = shim._routeParser.call(this, shim, fn, fnName, spec.route)
    }

    wrapAllMiddleware.call(this, { routeIdx, middlewares: args, shim, spec, route })

    return fn.apply(this, args)
  }
}