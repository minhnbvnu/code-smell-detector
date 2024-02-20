function keysEqualModels (keys, models) {
  if (keys.length === models.length) {
    // 均为空数组
    if (!keys.length) return true
    return models.every(val => keys.includes(val.key))
  } else {
    return false
  }
}