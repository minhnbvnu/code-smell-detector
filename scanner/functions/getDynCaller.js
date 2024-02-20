function getDynCaller(sig, ptr) {
          var argCache = [];
          return function() {
            argCache.length = 0;
            Object.assign(argCache, arguments);
            return dynCall(sig, ptr, argCache);
          };
        }