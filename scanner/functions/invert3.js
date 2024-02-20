function invert3(out, a2) {
    var a0 = a2[0], a1 = a2[1], a22 = a2[2], a3 = a2[3];
    var dot4 = a0 * a0 + a1 * a1 + a22 * a22 + a3 * a3;
    var invDot = dot4 ? 1 / dot4 : 0;
    out[0] = -a0 * invDot;
    out[1] = -a1 * invDot;
    out[2] = -a22 * invDot;
    out[3] = a3 * invDot;
    return out;
  }