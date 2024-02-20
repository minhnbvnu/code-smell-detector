function extractStrokeJoin(strokeJoin) {
  switch (strokeJoin) {
    case 'miter': return 0;
    case 'bevel': return 2;
    default: return 1; // round
  }
}