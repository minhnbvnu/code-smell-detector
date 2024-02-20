function pullDebian(next) {
    self.log('Prefetching base docker image: debian:jessie');
    self.docker.pull('debian:jessie', {repo: 'debian'}, function(err, stream) {
      if (err) {
        next(err);
      } else {
        self.docker.modem.followProgress(stream, next);
      }
    });
  }