function attemptAsync(queueableFn) {
      var clearTimeout = function () {
          Function.prototype.apply.apply(self.timer.clearTimeout, [j$.getGlobal(), [timeoutId]]);
        },
        next = once(function () {
          clearTimeout(timeoutId);
          self.run(queueableFns, iterativeIndex + 1);
        }),
        timeoutId;

      next.fail = function() {
        self.fail.apply(null, arguments);
        next();
      };

      if (queueableFn.timeout) {
        timeoutId = Function.prototype.apply.apply(self.timer.setTimeout, [j$.getGlobal(), [function() {
          var error = new Error('Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.');
          onException(error, queueableFn);
          next();
        }, queueableFn.timeout()]]);
      }

      try {
        queueableFn.fn.call(self.userContext, next);
      } catch (e) {
        handleException(e, queueableFn);
        next();
      }
    }