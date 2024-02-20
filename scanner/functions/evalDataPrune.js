function evalDataPrune(source, propsToRemove, requiredInitialProps, stack) {
        var prunePaths = getPrunePath(propsToRemove);
        var requiredPaths = getPrunePath(requiredInitialProps);
        var nativeObjects = {
          nativeStringify: window.JSON.stringify
        };
        var evalWrapper = function evalWrapper(target, thisArg, args) {
          var data = Reflect.apply(target, thisArg, args);
          if (typeof data === "object") {
            data = jsonPruner(source, data, prunePaths, requiredPaths, stack, nativeObjects);
          }
          return data;
        };
        var evalHandler = {
          apply: evalWrapper
        };
        window.eval = new Proxy(window.eval, evalHandler);
      }