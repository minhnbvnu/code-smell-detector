function wrapCreate(shim, fn, name) {
    return function wrappedCreateConnection() {
      const segment = shim.getActiveSegment()
      if (!segment) {
        return fn.apply(this, arguments)
      }

      const child = shim.createSegment('net.' + name, null, segment)
      const sock = shim.applySegment(fn, child, true, this, arguments)
      wrapSocket(sock, child)
      return sock
    }
  }