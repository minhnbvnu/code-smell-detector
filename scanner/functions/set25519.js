function set25519(r, a) {
    var i;
    for (i = 0; i < 16; i++) r[i] = a[i] | 0;
  }