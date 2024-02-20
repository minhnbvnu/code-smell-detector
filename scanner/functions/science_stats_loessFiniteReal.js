function science_stats_loessFiniteReal(values) {
  var n = values.length,
      i = -1;

  while (++i < n) if (!isFinite(values[i])) return false;

  return true;
}