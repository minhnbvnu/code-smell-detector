function lastPositionOfKeyPrefix (array, key) {
  let p = -1
  const keyArray = key.split('#')
  const prefix = keyArray.slice(0, keyArray.length - 1).join('#')
  for (let i = 0; i < array.length; i++) {
    if (array[i].fieldName.startsWith(prefix)) {
      p = i
    }
  }
  return p
}