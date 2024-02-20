function valid (string) {
  try {
    parse(string)
    return true
  } catch (error) {
    return false
  }
}