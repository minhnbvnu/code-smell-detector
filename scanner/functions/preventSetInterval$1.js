function preventSetInterval$1(source, matchCallback, matchDelay) {
      // logs setIntervals to console if no arguments have been specified
      var shouldLog = typeof matchCallback === 'undefined' && typeof matchDelay === 'undefined';
      var handlerWrapper = function handlerWrapper(target, thisArg, args) {
        var callback = args[0];
        var delay = args[1];
        var shouldPrevent = false;
        if (shouldLog) {
          hit(source);
          // https://github.com/AdguardTeam/Scriptlets/issues/105
          logMessage(source, "setInterval(".concat(String(callback), ", ").concat(delay, ")"), true);
        } else {
          shouldPrevent = isPreventionNeeded({
            callback,
            delay,
            matchCallback,
            matchDelay
          });
        }
        if (shouldPrevent) {
          hit(source);
          args[0] = noopFunc;
        }
        return target.apply(thisArg, args);
      };
      var setIntervalHandler = {
        apply: handlerWrapper
      };
      window.setInterval = new Proxy(window.setInterval, setIntervalHandler);
    }