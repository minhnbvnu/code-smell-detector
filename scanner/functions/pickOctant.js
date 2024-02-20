function pickOctant(i) {
  return new Vector((i & 1) * 2 - 1, (i & 2) - 1, (i & 4) / 2 - 1);
}