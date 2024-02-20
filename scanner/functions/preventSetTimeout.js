function preventSetTimeout(source, matchCallback, matchDelay) {
        var shouldLog = typeof matchCallback === "undefined" && typeof matchDelay === "undefined";
        var handlerWrapper = function handlerWrapper(target, thisArg, args) {
          var callback = args[0];
          var delay = args[1];
          var shouldPrevent = false;
          if (shouldLog) {
            hit(source);
            logMessage(source, "setTimeout(".concat(String(callback), ", ").concat(delay, ")"), true);
          } else {
            shouldPrevent = isPreventionNeeded({
              callback: callback,
              delay: delay,
              matchCallback: matchCallback,
              matchDelay: matchDelay
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