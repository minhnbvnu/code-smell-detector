function passSourceAndProps(source, code) {
      var redirect = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var sourceString = JSON.stringify(source);
      var argsString = source.args ? "[".concat(source.args.map(function (arg) {
        return JSON.stringify(arg);
      }), "]") : undefined;
      var params = argsString ? "".concat(sourceString, ", ").concat(argsString) : sourceString;
      if (redirect) {
        return "(function(source, args){\n".concat(code, "\n})(").concat(params, ");");
      }
      return "(".concat(code, ")(").concat(params, ");");
    }