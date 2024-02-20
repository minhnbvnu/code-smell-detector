function accessKeys(keys) {
  let a = {}
  for (let i in keys) {
    let key = keys[i]
    a[key] = identity(key)
  }
  return a
}