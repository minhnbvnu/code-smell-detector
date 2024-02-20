function wrapResponse(shim, response) {
  shim.recordRender(response, 'render', {
    view: shim.FIRST,
    callback: function bindCallback(shim, render, name, segment, args) {
      let cbIdx = shim.normalizeIndex(args.length, shim.LAST)
      if (cbIdx === null) {
        return
      }

      const res = this
      let cb = args[cbIdx]
      if (!shim.isFunction(cb)) {
        ++cbIdx
        cb = function defaultRenderCB(err, str) {
          // https://github.com/expressjs/express/blob/4.x/lib/response.js#L961-L962
          if (err) {
            return res.req.next(err)
          }
          res.send(str)
        }
        args.push(cb)
      }
      args[cbIdx] = shim.bindSegment(cb, segment, true)
    }
  })
}