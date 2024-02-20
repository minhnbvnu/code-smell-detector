function d3_tweenByName(b, name) {
    return d3.tween(b, d3_interpolateByName(name));
  }