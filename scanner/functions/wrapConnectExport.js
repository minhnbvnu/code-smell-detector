function wrapConnectExport(shim, connect, v3) {
  shim.wrapExport(connect, function wrapExport(shim, fn) {
    const wrapper = shim.wrap(fn, function wrapConnect(shim, _fn) {
      return function wrappedConnect() {
        const res = _fn.apply(this, arguments)
        if (v3) {
          shim.wrapMiddlewareMounter(res, 'use', {
            route: shim.FIRST,
            wrapper: wrapMiddleware
          })
        }
        return res
      }
    })
    shim.proxy(fn, Object.keys(fn), wrapper)
    return wrapper
  })
}