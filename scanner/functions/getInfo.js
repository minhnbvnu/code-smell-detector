function getInfo(next) {
    self.docker.info(function(err, info) {
      if (err) {
        return next(err);
      }
      self.dockerInfo = info;
      self.CPUS = info.NCPU;
      debug('Connected to docker:', err, info);
      next(err);
    });
  }