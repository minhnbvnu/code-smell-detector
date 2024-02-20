function delegateProperty(f) {
    return function() {
      if (!arguments.length) return f();
      f.apply(null, arguments);
      return self;
    };
  }