function adjustSetTimeout(source, matchCallback, matchDelay, boost) {
        var nativeSetTimeout = window.setTimeout;
        var matchRegexp = toRegExp(matchCallback);
        var timeoutWrapper = function timeoutWrapper(callback, delay) {
          if (!isValidCallback(callback)) {
            var message = "Scriptlet can't be applied because of invalid callback: '".concat(String(callback), "'");
            logMessage(source, message);
          } else if (matchRegexp.test(callback.toString()) && isDelayMatched(matchDelay, delay)) {
            delay *= getBoostMultiplier(boost);
            hit(source);
          }
          for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
          }
          return nativeSetTimeout.apply(window, [callback, delay, ...args]);
        };
        window.setTimeout = timeoutWrapper;
      }