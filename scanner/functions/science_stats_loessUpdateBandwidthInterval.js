function science_stats_loessUpdateBandwidthInterval(
  xval, weights, i, bandwidthInterval) {

  var left = bandwidthInterval[0],
      right = bandwidthInterval[1];

  // The right edge should be adjusted if the next point to the right
  // is closer to xval[i] than the leftmost point of the current interval
  var nextRight = science_stats_loessNextNonzero(weights, right);
  if ((nextRight < xval.length) && (xval[nextRight] - xval[i]) < (xval[i] - xval[left])) {
    var nextLeft = science_stats_loessNextNonzero(weights, left);
    bandwidthInterval[0] = nextLeft;
    bandwidthInterval[1] = nextRight;
  }
}