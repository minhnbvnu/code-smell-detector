function rotateY2(out, a2, rad) {
    var s2 = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a2[0];
    var a01 = a2[1];
    var a02 = a2[2];
    var a03 = a2[3];
    var a20 = a2[8];
    var a21 = a2[9];
    var a22 = a2[10];
    var a23 = a2[11];
    if (a2 !== out) {
      out[4] = a2[4];
      out[5] = a2[5];
      out[6] = a2[6];
      out[7] = a2[7];
      out[12] = a2[12];
      out[13] = a2[13];
      out[14] = a2[14];
      out[15] = a2[15];
    }
    out[0] = a00 * c - a20 * s2;
    out[1] = a01 * c - a21 * s2;
    out[2] = a02 * c - a22 * s2;
    out[3] = a03 * c - a23 * s2;
    out[8] = a00 * s2 + a20 * c;
    out[9] = a01 * s2 + a21 * c;
    out[10] = a02 * s2 + a22 * c;
    out[11] = a03 * s2 + a23 * c;
    return out;
  }