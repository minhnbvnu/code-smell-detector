function extractStrokeCap(strokeCap) {
  switch (strokeCap) {
    case 'butt': return 0;
    case 'square': return 2;
    default: return 1; // round
  }
}