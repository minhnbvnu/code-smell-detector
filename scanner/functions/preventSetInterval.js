function preventSetInterval(source, matchCallback, matchDelay) {
        var shouldLog = typeof matchCallback === "undefined" && typeof matchDelay === "undefined";
        var handlerWrapper = function handlerWrapper(target, thisArg, args) {
          var callback = args[0];
          var delay = args[1];
          var shouldPrevent = false;
          if (shouldLog) {
            hit(source);
            logMessage(source, "setInterval(".concat(String(callback), ", ").concat(delay, ")"), true);
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
        var setIntervalHandler = {
          apply: handlerWrapper
        };
        window.setInterval = new Proxy(window.setInterval, setIntervalHandler);
      }