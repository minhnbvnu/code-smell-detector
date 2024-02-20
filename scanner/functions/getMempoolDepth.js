function getMempoolDepth(fee_histogram, feerate) {
  let depth = 0
  for (let i=0; i < fee_histogram.length && fee_histogram[i][0] > feerate; depth += fee_histogram[i++][1]);
  return depth
}