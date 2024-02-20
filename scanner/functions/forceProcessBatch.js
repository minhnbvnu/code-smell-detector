function forceProcessBatch(localAsyncProcess) {
      if (isProcessing) {
        return;
      }

      if (localAsyncProcess === undefined) {
        localAsyncProcess = asyncProcess;
      }

      if (asyncFrameHandler) {
        cancelFrame(asyncFrameHandler);
        asyncFrameHandler = null;
      }

      if (localAsyncProcess) {
        processBatchAsync();
      } else {
        processBatch();
      }
    }