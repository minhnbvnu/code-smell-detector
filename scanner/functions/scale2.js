function scale2(out, a2, v) {
    var x = v[0], y = v[1], z = v[2];
    out[0] = a2[0] * x;
    out[1] = a2[1] * x;
    out[2] = a2[2] * x;
    out[3] = a2[3] * x;
    out[4] = a2[4] * y;
    out[5] = a2[5] * y;
    out[6] = a2[6] * y;
    out[7] = a2[7] * y;
    out[8] = a2[8] * z;
    out[9] = a2[9] * z;
    out[10] = a2[10] * z;
    out[11] = a2[11] * z;
    out[12] = a2[12];
    out[13] = a2[13];
    out[14] = a2[14];
    out[15] = a2[15];
    return out;
  }