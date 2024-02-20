function isDelayMatched(inputDelay, realDelay) {
        return shouldMatchAnyDelay(inputDelay) || realDelay === getMatchDelay(inputDelay);
      }