function rotate2(out, a2, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2];
    var len2 = Math.hypot(x, y, z);
    var s2, c, t2;
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;
    var b00, b01, b02;
    var b10, b11, b12;
    var b20, b21, b22;
    if (len2 < EPSILON) {
      return null;
    }
    len2 = 1 / len2;
    x *= len2;
    y *= len2;
    z *= len2;
    s2 = Math.sin(rad);
    c = Math.cos(rad);
    t2 = 1 - c;
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
    b00 = x * x * t2 + c;
    b01 = y * x * t2 + z * s2;
    b02 = z * x * t2 - y * s2;
    b10 = x * y * t2 - z * s2;
    b11 = y * y * t2 + c;
    b12 = z * y * t2 + x * s2;
    b20 = x * z * t2 + y * s2;
    b21 = y * z * t2 - x * s2;
    b22 = z * z * t2 + c;
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;
    if (a2 !== out) {
      out[12] = a2[12];
      out[13] = a2[13];
      out[14] = a2[14];
      out[15] = a2[15];
    }
    return out;
  }