function onhead (opts) {
      req = new Request(socket, opts)
      res = new Response(self, socket, headers)
      self.emit('request', req, res)
    }