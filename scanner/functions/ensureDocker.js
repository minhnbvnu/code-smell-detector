function ensureDocker(options, callback) {
  if (options.driver === 'docker') {
    var docker = new Docker();
    docker.info(function(err) {
      if (err) {
        console.error('Docker not usable:', err);
      }
      callback(err);
    });
  } else {
    setImmediate(callback);
  }
}