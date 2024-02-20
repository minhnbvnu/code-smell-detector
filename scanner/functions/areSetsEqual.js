function areSetsEqual(set1, set2) {
  if (set1 === set2) {
    return true
  }

  if (set1.size !== set2.size) {
    return false
  }

  return !Array.from(set1).some(item => !set2.has(item))
}