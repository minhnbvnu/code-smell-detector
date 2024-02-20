function resolvePromise(val) {
        if (done) return;
        done = true;
        that.$$resolve(val);
      }