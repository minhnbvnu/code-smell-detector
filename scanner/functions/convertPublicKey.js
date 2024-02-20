function convertPublicKey(pk) {
    var z = new Uint8Array(32),
      q = [gf(), gf(), gf(), gf()],
      a = gf(),
      b = gf();

    if (unpackneg(q, pk)) return null; // reject invalid key

    var y = q[1];

    A(a, gf1, y);
    Z(b, gf1, y);
    inv25519(b, b);
    M(a, a, b);

    pack25519(z, a);
    return z;
  }