function wrapSocket(sock, segment) {
    shim.wrap(sock, 'emit', function emitWrapper(shim, fn) {
      return shim.bindSegment(fn, segment)
    })
  }