function asinhy(x) {
    var y = fabs(x);
    y = log1py(y * (1 + y/(hypot(1, y) + 1)));
    return x < 0 ? -y : y;
  }