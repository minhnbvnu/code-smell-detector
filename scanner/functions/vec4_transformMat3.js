function vec4_transformMat3(out, a2, m) {
    const x = a2[0];
    const y = a2[1];
    const z = a2[2];
    out[0] = m[0] * x + m[3] * y + m[6] * z;
    out[1] = m[1] * x + m[4] * y + m[7] * z;
    out[2] = m[2] * x + m[5] * y + m[8] * z;
    out[3] = a2[3];
    return out;
  }