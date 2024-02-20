function removeSamePlace(entry) {
  var firsts = {}
  return function (entry) {
    var hash = locationHash(entry.longitude, entry.latitude)

    if (firsts[hash] && !entry.future) {
      return false
    }

    firsts[hash] = true
    return true
  }
}