function tryRequire (name) {
  try {
    return require(name)
  } catch (e) {
    return {}
  }
}