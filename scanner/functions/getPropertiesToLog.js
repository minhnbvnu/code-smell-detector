function getPropertiesToLog(extra) {
  const obj = Object.assign(Object.create(null), extra)
  // Error properties (message, stack) are not enumerable, so getting them directly
  if (extra instanceof Error) {
    const names = Object.getOwnPropertyNames(extra)
    if (names) {
      for (let i = 0; i < names.length; i++) {
        obj[names[i]] = extra[names[i]]
      }
    }
  }
  return obj
}