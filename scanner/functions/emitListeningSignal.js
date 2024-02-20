function emitListeningSignal(serialCb) {
    debug('emitting listening event');
    var addr = self._httpServer.address();
    self.emit('listening', addr);
    self._meshApp.set('url', util.format('http://127.0.0.1:%d', addr.port));
    self._meshApp.emit('started');
    process.nextTick(serialCb);
  }