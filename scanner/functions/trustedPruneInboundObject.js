function trustedPruneInboundObject(source, functionName, propsToRemove, requiredInitialProps) {
        var stack = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
        if (!functionName) {
          return;
        }
        var nativeObjects = {
          nativeStringify: window.JSON.stringify
        };
        var _getPropertyInChain = getPropertyInChain(window, functionName),
          base = _getPropertyInChain.base,
          prop = _getPropertyInChain.prop;
        if (!base || !prop || typeof base[prop] !== "function") {
          var message = "".concat(functionName, " is not a function");
          logMessage(source, message);
          return;
        }
        var prunePaths = getPrunePath(propsToRemove);
        var requiredPaths = getPrunePath(requiredInitialProps);
        var objectWrapper = function objectWrapper(target, thisArg, args) {
          var data = args[0];
          if (typeof data === "object") {
            data = jsonPruner(source, data, prunePaths, requiredPaths, stack, nativeObjects);
            args[0] = data;
          }
          return Reflect.apply(target, thisArg, args);
        };
        var objectHandler = {
          apply: objectWrapper
        };
        base[prop] = new Proxy(base[prop], objectHandler);
      }