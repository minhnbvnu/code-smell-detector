function vec3_transformMat2(out, a2, m) {
    const x = a2[0];
    const y = a2[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    out[2] = a2[2];
    return out;
  }