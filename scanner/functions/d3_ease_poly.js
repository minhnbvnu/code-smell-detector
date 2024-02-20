function d3_ease_poly(e) {
    return function(t) {
      return Math.pow(t, e);
    };
  }