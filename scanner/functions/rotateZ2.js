function rotateZ2(out, a2, rad) {
    var s2 = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a2[0];
    var a01 = a2[1];
    var a02 = a2[2];
    var a03 = a2[3];
    var a10 = a2[4];
    var a11 = a2[5];
    var a12 = a2[6];
    var a13 = a2[7];
    if (a2 !== out) {
      out[8] = a2[8];
      out[9] = a2[9];
      out[10] = a2[10];
      out[11] = a2[11];
      out[12] = a2[12];
      out[13] = a2[13];
      out[14] = a2[14];
      out[15] = a2[15];
    }
    out[0] = a00 * c + a10 * s2;
    out[1] = a01 * c + a11 * s2;
    out[2] = a02 * c + a12 * s2;
    out[3] = a03 * c + a13 * s2;
    out[4] = a10 * c - a00 * s2;
    out[5] = a11 * c - a01 * s2;
    out[6] = a12 * c - a02 * s2;
    out[7] = a13 * c - a03 * s2;
    return out;
  }