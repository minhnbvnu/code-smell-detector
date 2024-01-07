function log1py(x) {
    var y = 1 + x,
        z = y - 1;
    return z === 0 ? x : x * log(y) / z;
  }