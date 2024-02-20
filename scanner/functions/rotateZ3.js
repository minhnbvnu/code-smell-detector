function rotateZ3(out, a2, rad) {
    rad *= 0.5;
    var ax = a2[0], ay = a2[1], az = a2[2], aw = a2[3];
    var bz = Math.sin(rad), bw = Math.cos(rad);
    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
  }