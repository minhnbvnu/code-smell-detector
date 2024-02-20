function typeError (type) {
  return new Error('Can only stringify objects, not ' + type)
}