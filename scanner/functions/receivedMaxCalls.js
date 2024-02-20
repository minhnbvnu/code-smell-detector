function receivedMaxCalls(expectation) {
      if (typeof expectation.maxCalls != "number") {
        return false;
      }

      return expectation.callCount == expectation.maxCalls;
    }