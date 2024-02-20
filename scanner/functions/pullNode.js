function pullNode(next) {
    self.log('Prefetching base docker image: node:0.10');
    self.docker.pull('node:0.10', {repo: 'node'}, function(err, stream) {
      if (err) {
        next(err);
      } else {
        self.docker.modem.followProgress(stream, next);
      }
    });
  }