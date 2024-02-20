function rejectPromise(val) {
        if (done) return;
        done = true;
        that.$$reject(val);
      }