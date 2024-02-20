function receivedMinCalls(expectation) {
      var hasMinLimit = typeof expectation.minCalls == "number";
      return !hasMinLimit || expectation.callCount >= expectation.minCalls;
    }