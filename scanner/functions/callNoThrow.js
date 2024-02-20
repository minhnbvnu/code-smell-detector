function callNoThrow(source, functionName) {
        if (!functionName) {
          return;
        }
        var _getPropertyInChain = getPropertyInChain(window, functionName),
          base = _getPropertyInChain.base,
          prop = _getPropertyInChain.prop;
        if (!base || !prop || typeof base[prop] !== "function") {
          var message = "".concat(functionName, " is not a function");
          logMessage(source, message);
          return;
        }
        var objectWrapper = function objectWrapper() {
          var result;
          try {
            result = Reflect.apply(...arguments);
          } catch (e) {
            var _message = "Error calling ".concat(functionName, ": ").concat(e.message);
            logMessage(source, _message);
          }
          hit(source);
          return result;
        };
        var objectHandler = {
          apply: objectWrapper
        };
        base[prop] = new Proxy(base[prop], objectHandler);
      }