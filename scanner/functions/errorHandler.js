function errorHandler(err) {
        if (failedLoadPolicy === "remove") deregisterFutureState();
        return $q.reject(err);
      }