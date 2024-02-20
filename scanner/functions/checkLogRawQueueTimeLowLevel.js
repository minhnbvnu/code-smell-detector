function checkLogRawQueueTimeLowLevel(...args) {
        if (didLogRawQueueTime(args)) {
          didLogLowLevel = true
        }
      }