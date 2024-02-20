function _isValidOrThrow(opts) {
  if (!opts) {
    throw new Error('Metric aggregator must be created with options.')
  }

  if (opts.apdexT == null || opts.apdexT === '') {
    throw new Error('Metric aggregator must be created with apdexT')
  }

  if (!opts.mapper) {
    throw new Error('Metric aggregator must be created with a mapper')
  }

  if (!opts.normalizer) {
    throw new Error('Metric aggregator must be created with a name normalizer')
  }
}