function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}