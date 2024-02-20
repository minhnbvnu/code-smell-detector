function determinant2(a2) {
    var a00 = a2[0], a01 = a2[1], a02 = a2[2], a03 = a2[3];
    var a10 = a2[4], a11 = a2[5], a12 = a2[6], a13 = a2[7];
    var a20 = a2[8], a21 = a2[9], a22 = a2[10], a23 = a2[11];
    var a30 = a2[12], a31 = a2[13], a32 = a2[14], a33 = a2[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32;
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  }