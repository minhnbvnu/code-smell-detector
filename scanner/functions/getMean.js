function getMean(sample) {
    return reduce(sample, function(sum, x) {
      return sum + x;
    }) / sample.length || 0;
  }