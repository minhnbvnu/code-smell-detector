function wrapProtoDecorate(shim, proto) {
  shim.wrap(proto, 'decorate', function wrapDecorate(shim, original) {
    return function wrappedDecorate(type) {
      // server.decorate also accepts 'request', 'toolkit', 'server' types,
      // but we're only concerned with 'handler'
      if (type !== 'handler') {
        return original.apply(this, arguments)
      }

      // Convert arguments to usable array
      const args = shim.argsToArray.apply(shim, arguments)

      // Wrap the third server.decorate arg, the user-defined handler
      shim.wrap(args, shim.THIRD, function wrapHandler(shim, fn) {
        if (typeof fn !== 'function') {
          return
        }

        if (fn.defaults) {
          wrappedHandler.defaults = fn.defaults
        }

        return wrappedHandler

        function wrappedHandler(route) {
          const ret = fn.apply(this, arguments)

          return typeof ret === 'function' ? wrapRouteHandler(shim, ret, route && route.path) : ret
        }
      })

      return original.apply(this, args)
    }
  })
}