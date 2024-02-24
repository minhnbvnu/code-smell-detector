function forceWindowClose(source) {
        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
        if (typeof window.close !== "function") {
          var message = "window.close() is not a function so 'close-window' scriptlet is unavailable";
          logMessage(source, message);
          return;
        }
        var closeImmediately = function closeImmediately() {
          try {
            hit(source);
            window.close();
          } catch (e) {
            logMessage(source, e);
          }
        };
        var closeByExtension = function closeByExtension() {
          var extCall = function extCall() {
            dispatchEvent(new Event("adguard:scriptlet-close-window"));
          };
          window.addEventListener("adguard:subscribed-to-close-window", extCall, {
            once: true
          });
          setTimeout(function () {
            window.removeEventListener("adguard:subscribed-to-close-window", extCall, {
              once: true
            });
          }, 5e3);
        };
        var shouldClose = function shouldClose() {
          if (path === "") {
            return true;
          }
          var pathRegexp = toRegExp(path);
          var currentPath = "".concat(window.location.pathname).concat(window.location.search);
          return pathRegexp.test(currentPath);
        };
        if (shouldClose()) {
          closeImmediately();
          if (navigator.userAgent.includes("Chrome")) {
            closeByExtension();
          }
        }
      }