function adjustSetTimeout$1(source, matchCallback, matchDelay, boost) {
      var nativeSetTimeout = window.setTimeout;
      var matchRegexp = toRegExp(matchCallback);
      var timeoutWrapper = function timeoutWrapper(callback, delay) {
        // https://github.com/AdguardTeam/Scriptlets/issues/221
        if (!isValidCallback(callback)) {
          // eslint-disable-next-line max-len
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