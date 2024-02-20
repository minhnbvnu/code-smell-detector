function createOnErrorHandler(rid) {
        var nativeOnError = window.onerror;
        return function onError(error) {
          if (typeof error === "string" && error.includes(rid)) {
            return true;
          }
          if (nativeOnError instanceof Function) {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }
            return nativeOnError.apply(window, [error, ...args]);
          }
          return false;
        };
      }