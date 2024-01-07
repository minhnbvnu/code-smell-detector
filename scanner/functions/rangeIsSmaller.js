function rangeIsSmaller(mouse, house) {
  if (!house) return true;
  const mvec = vecFromRange(mouse);
  const hvec = vecFromRange(house);
  return Point.min(mvec, hvec) === mvec;
}