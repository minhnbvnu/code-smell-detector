function fail(reason) {
        result.$$failure = reason;
        resolution.reject(reason);
      }