function ApdexStats(apdexT) {
  if (!apdexT && apdexT !== 0) {
    throw new Error('Apdex summary must be created with apdexT.')
  }
  this.apdexT = apdexT

  this.satisfying = 0
  this.tolerating = 0
  this.frustrating = 0
}