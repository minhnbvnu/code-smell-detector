function wrapListen2(shim, fn) {
    return function wrappedListen2() {
      const segment = shim.getActiveSegment()
      const emit = this.emit

      if (!segment || !emit) {
        return fn.apply(this, arguments)
      }

      this.emit = wrappedEmit

      return fn.apply(this, arguments)

      function wrappedEmit(ev, socket) {
        if (ev !== 'connection' || !socket || !socket._handle) {
          return emit.apply(this, arguments)
        }

        const child = shim.createSegment('net.Server.onconnection', segment)

        if (socket._handle.onread) {
          shim.bindSegment(socket._handle, 'onread', child)
        }

        return shim.applySegment(emit, child, true, this, arguments)
      }
    }
  }