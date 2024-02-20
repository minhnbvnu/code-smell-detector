function parseDelayArg(delay) {
        var INVERT_MARKER = "!";
        var isInvertedDelayMatch = delay === null || delay === void 0 ? void 0 : delay.startsWith(INVERT_MARKER);
        var delayValue = isInvertedDelayMatch ? delay.slice(1) : delay;
        var parsedDelay = parseInt(delayValue, 10);
        var delayMatch = nativeIsNaN(parsedDelay) ? null : parsedDelay;
        return {
          isInvertedDelayMatch: isInvertedDelayMatch,
          delayMatch: delayMatch
        };
      }