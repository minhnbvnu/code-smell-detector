function preventSetTimeout$1(source, matchCallback, matchDelay) {
      // logs setTimeouts to console if no arguments have been specified
      var shouldLog = typeof matchCallback === 'undefined' && typeof matchDelay === 'undefined';
      var handlerWrapper = function handlerWrapper(target, thisArg, args) {
        var callback = args[0];
        var delay = args[1];
        var shouldPrevent = false;
        if (shouldLog) {
          hit(source);
          // https://github.com/AdguardTeam/Scriptlets/issues/105
          logMessage(source, "setTimeout(".concat(String(callback), ", ").concat(delay, ")"), true);
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
      var setTimeoutHandler = {
        apply: handlerWrapper
      };
      window.setTimeout = new Proxy(window.setTimeout, setTimeoutHandler);
    }