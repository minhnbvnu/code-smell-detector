function wrappedCtl(next) {
    self.requestOfInstance(id, cmd, function(rsp) {
      next(rsp && rsp.error, rsp);
    });
  }