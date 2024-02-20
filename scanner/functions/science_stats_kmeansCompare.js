function science_stats_kmeansCompare(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  var n = a.length,
      i = -1;
  while (++i < n) if (a[i] !== b[i]) return false;
  return true;
}