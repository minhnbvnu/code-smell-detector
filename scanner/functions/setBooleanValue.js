function setBooleanValue(a, b) {
  if (a === false) {
    return false
  } else {
    return a || b
  }
}