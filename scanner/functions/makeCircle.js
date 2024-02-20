function makeCircle(ptr, r, y, length, a, t) {
  for (let k = 0; k < length; k++) {
    const f = k / length;
    const ra = f * Maf.TAU + Maf.PI / 2;
    const rb = ra;
    const ry = y;
    const rx = r * Math.cos(ra);
    const rz = r * Math.sin(ra);

    posValues[ptr * 3 + 0] = rx;
    posValues[ptr * 3 + 1] = ry;
    posValues[ptr * 3 + 2] = rz;

    const d = 6;
    posValues2[ptr * 3 + 0] = (r + t * d) * Math.cos(ra);
    posValues2[ptr * 3 + 1] = ry - 10 * Math.pow(t - .1, 2);
    posValues2[ptr * 3 + 2] = (r + t * d) * Math.sin(ra);

    m.makeRotationY(-ra);
    m2.makeRotationZ(a - t * Maf.TAU);
    m.multiply(m2);
    q.setFromRotationMatrix(m);
    quatValues[ptr * 4 + 0] = q.x;
    quatValues[ptr * 4 + 1] = q.y;
    quatValues[ptr * 4 + 2] = q.z;
    quatValues[ptr * 4 + 3] = q.w;

    m.makeRotationY(-ra);
    m2.makeRotationZ(a - t * Maf.TAU - .1 * y * Maf.TAU);
    m.multiply(m2);
    q.setFromRotationMatrix(m);
    quatValues2[ptr * 4 + 0] = q.x;
    quatValues2[ptr * 4 + 1] = q.y;
    quatValues2[ptr * 4 + 2] = q.z;
    quatValues2[ptr * 4 + 3] = q.w;
    ptr++;
  }
  return ptr;
}