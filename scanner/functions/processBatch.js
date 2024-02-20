function processBatch() {
      // Save the current batch, and create a new batch so that incoming functions are not added into the currently processing batch.
      // Continue processing until the top-level batch is empty (functions may be added to the new batch while processing, and so on).
      isProcessing = true;
      while (batch.size()) {
        var processingBatch = batch;
        batch = Batch();
        processingBatch.process();
      }
      isProcessing = false;
    }