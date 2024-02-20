function waitForTick(fn) {
      waitQueue.push(fn);
      if (waitQueue.length > 1) return;
      $$rAF(function() {
        for (var i = 0; i < waitQueue.length; i++) {
          waitQueue[i]();
        }
        waitQueue = [];
      });
    }