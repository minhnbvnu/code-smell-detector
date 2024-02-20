function startDriver(callback) {
    debug('starting driver');
    // XXX(sam) _driver knows if it is started, that doesn't have to be kept in
    // the server
    self._isStarted = true;

    self._serviceManager.getInstanceMetas(function(err, instanceMetas) {
      if (err) return callback(err);

      self._driver.start(instanceMetas, callback);
    });
  }