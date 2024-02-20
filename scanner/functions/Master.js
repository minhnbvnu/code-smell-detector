function Master(workerCount, env) {
  net.Server.call(this, {
    pauseOnConnect: true
  }, this.balance);

  this.env = env || {};

  this.seed = (Math.random() * 0xffffffff) | 0;
  this.workers = [];

  debug('master seed=%d', this.seed);

  this.once('listening', function() {
    debug('master listening on %j', this.address());

    for (var i = 0; i < workerCount; i++)
      this.spawnWorker();
  });
}