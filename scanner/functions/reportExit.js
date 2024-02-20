function reportExit(err, res) {
    debug('stopped container for instance %j:', id, err, res);
    cb(err, res);
  }