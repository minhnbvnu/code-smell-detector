function squashFeeHistogram(histogram) {
  let i = 0
  return SQUASH_BUCKETS.map(feerate => {
    let binSize = 0
    for (; i < histogram.length && histogram[i][0] >= feerate; binSize += histogram[i++][1]);
    return [ feerate, binSize ]
  })
}