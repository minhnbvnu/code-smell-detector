function simpleBind(context, fn) {
    return function(value) {
      fn.call(context, value);
    };
  }