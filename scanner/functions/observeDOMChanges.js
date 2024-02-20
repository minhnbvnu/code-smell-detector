function observeDOMChanges(callback) {
        var observeAttrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var attrsToObserve = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        var THROTTLE_DELAY_MS = 20;
        var observer = new MutationObserver(throttle(callbackWrapper, THROTTLE_DELAY_MS));
        var connect = function connect() {
          if (attrsToObserve.length > 0) {
            observer.observe(document.documentElement, {
              childList: true,
              subtree: true,
              attributes: observeAttrs,
              attributeFilter: attrsToObserve
            });
          } else {
            observer.observe(document.documentElement, {
              childList: true,
              subtree: true,
              attributes: observeAttrs
            });
          }
        };
        var disconnect = function disconnect() {
          observer.disconnect();
        };
        function callbackWrapper() {
          disconnect();
          callback();
          connect();
        }
        connect();
      }