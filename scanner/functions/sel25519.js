function sel25519(p, q, b) {
    var t,
      c = ~(b - 1);
    for (var i = 0; i < 16; i++) {
      t = c & (p[i] ^ q[i]);
      p[i] ^= t;
      q[i] ^= t;
    }
  }