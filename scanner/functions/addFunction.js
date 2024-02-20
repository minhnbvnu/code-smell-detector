function addFunction(level, fn) {
      if (!isProcessing && autoProcess && asyncProcess && batch.size() === 0) {
        // Since this is async, it is guaranteed to be executed after that the fn is added to the batch.
        // This needs to be done before, since we're checking the size of the batch to be 0.
        processBatchAsync();
      }

      batch.add(level, fn);
    }