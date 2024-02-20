function rotateY3(out, a2, rad) {
    rad *= 0.5;
    var ax = a2[0], ay = a2[1], az = a2[2], aw = a2[3];
    var by = Math.sin(rad), bw = Math.cos(rad);
    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
  }