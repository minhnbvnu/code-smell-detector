function calculateApdexZone(duration, apdexT) {
  if (duration <= apdexT) {
    return 'S' // satisfied
  }

  if (duration <= apdexT * 4) {
    return 'T' // tolerating
  }

  return 'F' // frustrated
}