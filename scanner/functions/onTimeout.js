function onTimeout() {
        timedOut = true;
        req.abort();

        reject(new errors.RequestTimeout());
      }