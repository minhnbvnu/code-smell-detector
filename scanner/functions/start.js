function start() {
    self.emit('start');
    self.runSuite(rootSuite, function(){
      debug('finished running');
      self.emit('end');
    });
  }