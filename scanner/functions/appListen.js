function appListen(callback) {
    debug('Initializing http listen on port %d', self._listenPort);
    try {
      self._baseHttpServer.listen(self._listenPort, function(err) {
        if (err) return callback(err);

        // The HTTP server. This is used when stopping PM and to get the address
        // that PM is listening on
        self._httpServer = this;
        self._started = true;
        return callback();
      });
    } catch (err) {
      callback(err);
    }
  }