function translate2(out, a2, v) {
    var x = v[0], y = v[1], z = v[2];
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;
    if (a2 === out) {
      out[12] = a2[0] * x + a2[4] * y + a2[8] * z + a2[12];
      out[13] = a2[1] * x + a2[5] * y + a2[9] * z + a2[13];
      out[14] = a2[2] * x + a2[6] * y + a2[10] * z + a2[14];
      out[15] = a2[3] * x + a2[7] * y + a2[11] * z + a2[15];
    } else {
      a00 = a2[0];
      a01 = a2[1];
      a02 = a2[2];
      a03 = a2[3];
      a10 = a2[4];
      a11 = a2[5];
      a12 = a2[6];
      a13 = a2[7];
      a20 = a2[8];
      a21 = a2[9];
      a22 = a2[10];
      a23 = a2[11];
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a03;
      out[4] = a10;
      out[5] = a11;
      out[6] = a12;
      out[7] = a13;
      out[8] = a20;
      out[9] = a21;
      out[10] = a22;
      out[11] = a23;
      out[12] = a00 * x + a10 * y + a20 * z + a2[12];
      out[13] = a01 * x + a11 * y + a21 * z + a2[13];
      out[14] = a02 * x + a12 * y + a22 * z + a2[14];
      out[15] = a03 * x + a13 * y + a23 * z + a2[15];
    }
    return out;
  }