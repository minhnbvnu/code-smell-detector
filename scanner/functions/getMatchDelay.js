function getMatchDelay(delay) {
        var DEFAULT_DELAY = 1e3;
        var parsedDelay = parseInt(delay, 10);
        var delayMatch = nativeIsNaN(parsedDelay) ? DEFAULT_DELAY : parsedDelay;
        return delayMatch;
      }