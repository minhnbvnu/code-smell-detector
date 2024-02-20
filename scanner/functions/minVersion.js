function minVersion (range) {
  let s = range.split(' ')[0]
  while (s) {
    if (semver.valid(s)) {
      break
    }
    s = s.slice(1)
  }
  return s || undefined
}