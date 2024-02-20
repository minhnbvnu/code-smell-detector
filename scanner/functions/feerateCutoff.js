function feerateCutoff(histogram) {

  let lastRate, totalSize=0
  for (const [ feerate, vsize ] of histogram) {
    totalSize += vsize

    if (totalSize >= MAX_BLOCK_VSIZE) {
      // if the first entry is larger than MAX_BLOCK_VSIZE, we cannot estimate the cut-off and return null instead
      return lastRate !== undefined ? lastRate : null
    }

    lastRate = feerate
  }
  // everything in the mempool should get confirmed in the next block
  return 0
}