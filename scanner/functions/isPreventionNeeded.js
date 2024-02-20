function isPreventionNeeded(_ref) {
        var callback = _ref.callback,
          delay = _ref.delay,
          matchCallback = _ref.matchCallback,
          matchDelay = _ref.matchDelay;
        if (!isValidCallback(callback)) {
          return false;
        }
        if (!isValidMatchStr(matchCallback) || matchDelay && !isValidMatchNumber(matchDelay)) {
          return false;
        }
        var _parseMatchArg = parseMatchArg(matchCallback),
          isInvertedMatch = _parseMatchArg.isInvertedMatch,
          matchRegexp = _parseMatchArg.matchRegexp;
        var _parseDelayArg = parseDelayArg(matchDelay),
          isInvertedDelayMatch = _parseDelayArg.isInvertedDelayMatch,
          delayMatch = _parseDelayArg.delayMatch;
        var parsedDelay = parseRawDelay(delay);
        var shouldPrevent = false;
        var callbackStr = String(callback);
        if (delayMatch === null) {
          shouldPrevent = matchRegexp.test(callbackStr) !== isInvertedMatch;
        } else if (!matchCallback) {
          shouldPrevent = parsedDelay === delayMatch !== isInvertedDelayMatch;
        } else {
          shouldPrevent = matchRegexp.test(callbackStr) !== isInvertedMatch && parsedDelay === delayMatch !== isInvertedDelayMatch;
        }
        return shouldPrevent;
      }