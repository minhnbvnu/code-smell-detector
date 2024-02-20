function preventRequestAnimationFrame(source, match) {
        var nativeRequestAnimationFrame = window.requestAnimationFrame;
        var shouldLog = typeof match === "undefined";
        var _parseMatchArg = parseMatchArg(match),
          isInvertedMatch = _parseMatchArg.isInvertedMatch,
          matchRegexp = _parseMatchArg.matchRegexp;
        var rafWrapper = function rafWrapper(callback) {
          var shouldPrevent = false;
          if (shouldLog) {
            hit(source);
            logMessage(source, "requestAnimationFrame(".concat(String(callback), ")"), true);
          } else if (isValidCallback(callback) && isValidStrPattern(match)) {
            shouldPrevent = matchRegexp.test(callback.toString()) !== isInvertedMatch;
          }
          if (shouldPrevent) {
            hit(source);
            return nativeRequestAnimationFrame(noopFunc);
          }
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          return nativeRequestAnimationFrame.apply(window, [callback, ...args]);
        };
        window.requestAnimationFrame = rafWrapper;
      }