function onReceive(req, cb) {
    if (req.cmd && req.cmd === 'listening') {
      console.log('Listening port: %s', req.port);
      pm.port = req.port;
      syncEnv(pm);
      pm.emit('listening', pm);
    }
    return cb();
  }