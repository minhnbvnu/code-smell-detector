function getPreventGetter(nativeGetter) {
        var preventGetter = function preventGetter(target, prop) {
          if (prop && prop === "closed") {
            return false;
          }
          if (typeof nativeGetter === "function") {
            return noopFunc;
          }
          return prop && target[prop];
        };
        return preventGetter;
      }