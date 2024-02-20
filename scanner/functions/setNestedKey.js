function setNestedKey(obj, keys, value) {
  const len = keys.length
  for (let i = 0; i < len - 1; i++) {
    const elem = keys[i]
    if (!obj[elem]) {
      obj[elem] = {}
    }

    obj = obj[elem]
  }

  obj[keys[len - 1]] = value
}