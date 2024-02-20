function neq25519(a, b) {
    var c = new Uint8Array(32),
      d = new Uint8Array(32);
    pack25519(c, a);
    pack25519(d, b);
    return crypto_verify_32(c, 0, d, 0);
  }