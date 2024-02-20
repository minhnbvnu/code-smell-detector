function findMaxArrayLength (cont) {
  const arrays = Object.keys(cont)
    .filter(k => Array.isArray(cont[k]))
    .map(k => cont[k])

  const lengths = arrays.map(arr => {
    if (Array.isArray(arr[0])) {
      // 2D array case
      return arr.reduce((a, r) => a + r.length, 0)
    } else {
      return arr.length
    }
  })

  return Math.max(0, ...lengths)
}