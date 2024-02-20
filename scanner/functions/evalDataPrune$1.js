function evalDataPrune$1(source, propsToRemove, requiredInitialProps, stack) {
      var prunePaths = getPrunePath(propsToRemove);
      var requiredPaths = getPrunePath(requiredInitialProps);
      var nativeObjects = {
        nativeStringify: window.JSON.stringify
      };
      var evalWrapper = function evalWrapper(target, thisArg, args) {
        var data = Reflect.apply(target, thisArg, args);
        if (typeof data === 'object') {
          data = jsonPruner(source, data, prunePaths, requiredPaths, stack, nativeObjects);
        }
        return data;
      };
      var evalHandler = {
        apply: evalWrapper
      };
      // eslint-disable-next-line no-eval
      window.eval = new Proxy(window.eval, evalHandler);
    }