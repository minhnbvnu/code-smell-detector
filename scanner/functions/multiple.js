function multiple(err) {
    if (emitted) {
      return;
    }
    emitted = true;
    var msg = 'done() called multiple times';
    if (err && err.message) {
      err.message += " (and Mocha's " + msg + ')';
      self.emit('error', err);
    } else {
      self.emit('error', new Error(msg));
    }
  }