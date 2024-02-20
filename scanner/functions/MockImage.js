function MockImage(driver, svcDir) {
    EE.call(this);
    images.push(svcDir);
    this.on('commit', function(c) {
      commits.push(c);
    });
    this.on('newListener', function(e) {
      listeners.push(e);
    });
  }