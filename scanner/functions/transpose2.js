function transpose2(out, a2) {
    if (out === a2) {
      var a01 = a2[1], a02 = a2[2], a03 = a2[3];
      var a12 = a2[6], a13 = a2[7];
      var a23 = a2[11];
      out[1] = a2[4];
      out[2] = a2[8];
      out[3] = a2[12];
      out[4] = a01;
      out[6] = a2[9];
      out[7] = a2[13];
      out[8] = a02;
      out[9] = a12;
      out[11] = a2[14];
      out[12] = a03;
      out[13] = a13;
      out[14] = a23;
    } else {
      out[0] = a2[0];
      out[1] = a2[4];
      out[2] = a2[8];
      out[3] = a2[12];
      out[4] = a2[1];
      out[5] = a2[5];
      out[6] = a2[9];
      out[7] = a2[13];
      out[8] = a2[2];
      out[9] = a2[6];
      out[10] = a2[10];
      out[11] = a2[14];
      out[12] = a2[3];
      out[13] = a2[7];
      out[14] = a2[11];
      out[15] = a2[15];
    }
    return out;
  }