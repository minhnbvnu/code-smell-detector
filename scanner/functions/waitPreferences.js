function waitPreferences (decode, waitFor, returnOnlyThat) {
    waitFor = (typeof waitFor === 'string') ? [waitFor] : waitFor;
    return new Promise((resolve) => {
      var checkInterval = setInterval(() => {
        if (hasAllProps(robotState, waitFor)) {
          clearInterval(checkInterval);
          resolve(returnOnlyThat ? filterProps(waitFor) : robotState);
        }
      }, 100);
    });
  }