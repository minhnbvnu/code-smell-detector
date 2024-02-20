function attemptSync(queueableFn) {
      try {
        queueableFn.fn.call(self.userContext);
      } catch (e) {
        handleException(e, queueableFn);
      }
    }