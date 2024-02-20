function handleException(e, queueableFn) {
      onException(e, queueableFn);
      if (!self.catchException(e)) {
        //TODO: set a var when we catch an exception and
        //use a finally block to close the loop in a nice way..
        throw e;
      }
    }