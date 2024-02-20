function normalize2(out, a2) {
    var x = a2[0];
    var y = a2[1];
    var z = a2[2];
    var w = a2[3];
    var len2 = x * x + y * y + z * z + w * w;
    if (len2 > 0) {
      len2 = 1 / Math.sqrt(len2);
    }
    out[0] = x * len2;
    out[1] = y * len2;
    out[2] = z * len2;
    out[3] = w * len2;
    return out;
  }