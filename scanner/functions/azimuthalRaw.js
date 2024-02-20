function azimuthalRaw(scale) {
  return function(x, y) {
    var cx = cos(x),
        cy = cos(y),
        k = scale(cx * cy);
        if (k === Infinity) return [2, 0];
    return [
      k * cy * sin(x),
      k * sin(y)
    ];
  }
}