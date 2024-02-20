function wrapPreHandlers(shim, container, path) {
  if (shim.isArray(container)) {
    for (let i = 0; i < container.length; ++i) {
      container[i] = wrapPreHandlers(shim, container[i], path)
    }
    return container
  } else if (shim.isFunction(container)) {
    return wrapPreHandler(shim, container, path)
  } else if (container.method && shim.isFunction(container.method)) {
    return shim.wrap(container, 'method', function wrapHandler(shim, handler) {
      return wrapPreHandler(shim, handler, path)
    })
  }
}