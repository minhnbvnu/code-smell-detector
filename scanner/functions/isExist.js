function isExist (array, key) {
  for (let i in array) {
    if (array[i].fieldName === key) {
      return true
    }
  }
  return false
}