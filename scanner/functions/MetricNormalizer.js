function MetricNormalizer(config, type) {
  if (!config) {
    throw new Error('normalizer must be created with configuration.')
  }
  if (!type) {
    throw new Error('normalizer must be created with a type.')
  }

  EventEmitter.call(this)

  this.config = config
  this.type = type
  // some mildly cheesy polymorphism to make normalizers work generically
  if (type === 'URL') {
    this.formatter = url
  } else {
    this.formatter = plain
  }

  this.rules = []
}