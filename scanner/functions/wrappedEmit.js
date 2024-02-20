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