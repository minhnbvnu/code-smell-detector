function setOffsetOuterArm(start, angle, sign, t) {
  const r = 10;
  const x = r * Math.cos(angle + Maf.PI);
  const z = r * Math.sin(angle + Maf.PI);
  for (let ptr = start, i = 0; ptr < start + OUTER_PIECES_ARM; ptr++, i++) {
    const a = angle + sign * Maf.TAU / 6 + sign * i * (Maf.TAU / 6) / OUTER_PIECES_ARM;
    const r = 10;
    posValues[ptr * 3 + 0] = x + r * Math.cos(a);
    posValues[ptr * 3 + 1] = 0;
    posValues[ptr * 3 + 2] = z + r * Math.sin(a);

    m.makeRotationAxis(up, -a);
    q.setFromRotationMatrix(m);
    quatValues[ptr * 4 + 0] = q.x;
    quatValues[ptr * 4 + 1] = q.y;
    quatValues[ptr * 4 + 2] = q.z;
    quatValues[ptr * 4 + 3] = q.w;

    const s = 1.5 + .5 * Math.sin((i + INNER_PIECES_ARM) * Maf.TAU / (OUTER_PIECES_ARM + INNER_PIECES_ARM) + t * Maf.TAU);
    scaleValues[ptr * 3 + 0] = s;
    scaleValues[ptr * 3 + 1] = s;
    scaleValues[ptr * 3 + 2] = s;
  }
}