function rotateX2(out, a2, rad) {
    var s2 = Math.sin(rad);
    var c = Math.cos(rad);
    var a10 = a2[4];
    var a11 = a2[5];
    var a12 = a2[6];
    var a13 = a2[7];
    var a20 = a2[8];
    var a21 = a2[9];
    var a22 = a2[10];
    var a23 = a2[11];
    if (a2 !== out) {
      out[0] = a2[0];
      out[1] = a2[1];
      out[2] = a2[2];
      out[3] = a2[3];
      out[12] = a2[12];
      out[13] = a2[13];
      out[14] = a2[14];
      out[15] = a2[15];
    }
    out[4] = a10 * c + a20 * s2;
    out[5] = a11 * c + a21 * s2;
    out[6] = a12 * c + a22 * s2;
    out[7] = a13 * c + a23 * s2;
    out[8] = a20 * c - a10 * s2;
    out[9] = a21 * c - a11 * s2;
    out[10] = a22 * c - a12 * s2;
    out[11] = a23 * c - a13 * s2;
    return out;
  }