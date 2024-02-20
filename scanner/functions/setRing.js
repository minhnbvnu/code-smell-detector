function setRing(start) {
  for (let ptr = start, i = 0; ptr < start + RING; ptr++, i++) {
    const a = i * Maf.TAU / RING;
    const r = 9;
    posValues[ptr * 3 + 0] = r * Math.cos(a);
    posValues[ptr * 3 + 1] = 0;
    posValues[ptr * 3 + 2] = r * Math.sin(a);

    m.makeRotationAxis(up, -a);
    q.setFromRotationMatrix(m);
    quatValues[ptr * 4 + 0] = q.x;
    quatValues[ptr * 4 + 1] = q.y;
    quatValues[ptr * 4 + 2] = q.z;
    quatValues[ptr * 4 + 3] = q.w;

    const s = 2;
    scaleValues[ptr * 3 + 0] = 1 * s;
    scaleValues[ptr * 3 + 1] = s;
    scaleValues[ptr * 3 + 2] = s;
  }
}