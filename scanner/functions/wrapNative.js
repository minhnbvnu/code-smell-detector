function wrapNative(method) {
    return function() {
      if (arguments.length === 0) {
        return method.call(this, Prototype.K);
      } else if (arguments[0] === undefined) {
        var args = slice.call(arguments, 1);
        args.unshift(Prototype.K);
        return method.apply(this, args);
      } else {
        return method.apply(this, arguments);
      }
    };
  }