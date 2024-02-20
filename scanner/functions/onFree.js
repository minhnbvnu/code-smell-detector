function onFree() {
      self.emit('free', socket, pending.host, pending.port)
    }