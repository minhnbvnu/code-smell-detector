function d3_interpolateNumber(a, b) {
    b -= a = +a;
    return function(t) {
      return a + b * t;
    };
  }