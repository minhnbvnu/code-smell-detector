function rotateX3(out, a2, rad) {
    rad *= 0.5;
    var ax = a2[0], ay = a2[1], az = a2[2], aw = a2[3];
    var bx = Math.sin(rad), bw = Math.cos(rad);
    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
  }