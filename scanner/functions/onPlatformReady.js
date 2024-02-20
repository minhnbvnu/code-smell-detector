function onPlatformReady() {
    // the device is all set to go, init our own stuff then fire off our event
    self.isReady = true;
    self.detect();
    for (var x = 0; x < readyCallbacks.length; x++) {
      // fire off all the callbacks that were added before the platform was ready
      readyCallbacks[x]();
    }
    readyCallbacks = [];
    ionic.trigger('platformready', { target: document });

    requestAnimationFrame(function() {
      document.body.classList.add('platform-ready');
    });
  }