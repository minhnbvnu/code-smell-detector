function parentIpcListen(callback) {
    if (process.send) {
      // XXX(sam) for the IPC messages... serviceId is now a mandatory field?
      // XXX(sam) this was only ever used by arc, and Krishna thinks it isn't
      // used at all now. We may be able to delete, but must confirm.
      self._parentIpc = processChannel.attach(self.onCtlRequest);
      self.once('listening', function(address) {
        self._parentIpc.notify({
          cmd: 'listening',
          port: address.port,
        });
      });
    }
    callback();
  }