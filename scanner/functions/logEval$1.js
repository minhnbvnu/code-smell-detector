function logEval$1(source) {
      // wrap eval function
      var nativeEval = window.eval;
      function evalWrapper(str) {
        hit(source);
        logMessage(source, "eval(\"".concat(str, "\")"), true);
        return nativeEval(str);
      }
      window.eval = evalWrapper;

      // wrap new Function
      var nativeFunction = window.Function;
      function FunctionWrapper() {
        hit(source);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        logMessage(source, "new Function(".concat(args.join(', '), ")"), true);
        return nativeFunction.apply(this, [...args]);
      }
      FunctionWrapper.prototype = Object.create(nativeFunction.prototype);
      FunctionWrapper.prototype.constructor = FunctionWrapper;
      window.Function = FunctionWrapper;
    }