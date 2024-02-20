function randomRecord(spec) {
  if (Math.random() > 0.5) {
    return recordFunc(spec)
  }
  return recordProperty(spec)
}