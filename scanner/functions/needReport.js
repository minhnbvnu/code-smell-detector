function needReport (sampling) {
  return Math.random() < (sampling || 1)
}