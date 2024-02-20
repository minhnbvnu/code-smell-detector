function wrapProtoExt(shim, proto) {
  shim.wrap(proto, 'ext', function wrapExt(shim, original) {
    return function wrappedExt(event, method) {
      const args = shim.argsToArray.apply(shim, arguments)

      if (shim.isArray(event)) {
        for (let i = 0; i < event.length; i++) {
          event[i].method = wrapMiddleware(shim, event[i].method, event[i].type)
        }
      } else if (shim.isObject(event)) {
        event.method = wrapMiddleware(shim, event.method, event.type)
      } else if (shim.isString(event)) {
        args[1] = wrapMiddleware(shim, method, event)
      } else {
        shim.logger.debug('Unsupported event type %j', event)
        return
      }

      return original.apply(this, args)
    }
  })
}