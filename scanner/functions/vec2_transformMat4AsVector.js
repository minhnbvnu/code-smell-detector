function vec2_transformMat4AsVector(out, a2, m) {
    const x = a2[0];
    const y = a2[1];
    const w = m[3] * x + m[7] * y || 1;
    out[0] = (m[0] * x + m[4] * y) / w;
    out[1] = (m[1] * x + m[5] * y) / w;
    return out;
  }