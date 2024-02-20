function clearPendingErrorsAndWarningsAfterDelay() {
    if (flushPendingErrorsAndWarningsAfterDelayTimeoutID !== null) {
      clearTimeout(flushPendingErrorsAndWarningsAfterDelayTimeoutID);
      flushPendingErrorsAndWarningsAfterDelayTimeoutID = null;
    }
  }