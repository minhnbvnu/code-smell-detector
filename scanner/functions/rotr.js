function rotr(x, n) {
    return x >>> n | x << 32 - n;
  }