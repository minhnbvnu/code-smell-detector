function d3_ease_reverse(f) {
    return function(t) {
      return 1 - f(1 - t);
    };
  }