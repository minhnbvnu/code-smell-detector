function setDefaults(obj, defaults) {
  if (!obj) {
    obj = Object.create(null)
  }
  const keys = Object.keys(defaults)

  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i]
    if (!hasOwnProperty(obj, key)) {
      obj[key] = defaults[key]
    }
  }

  return obj
}