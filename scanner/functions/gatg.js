function gatg(pp, B) {
    var cos_2B = 2 * cos(2 * B),
        i = pp.length - 1,
        h1 = pp[i],
        h2 = 0,
        h;
    while (--i >= 0) {
      h = -h2 + cos_2B * h1 + pp[i];
      h2 = h1;
      h1 = h;
    }
    return (B + h * sin(2 * B));
  }