function statOrNull (path) {
  try {
    return fs.statSync(path)
  } catch (e) {
    return null
  }
}