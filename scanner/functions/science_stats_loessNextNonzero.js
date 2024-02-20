function science_stats_loessNextNonzero(weights, i) {
  var j = i + 1;
  while (j < weights.length && weights[j] === 0) j++;
  return j;
}