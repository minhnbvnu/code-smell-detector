function getDataValue (key, input) {
  if (isSpecialParam(key) && (typeof input === 'object')) {
    return JSON.stringify(input)
  } else if (typeof input === 'number' || typeof input === 'boolean') {
    return input.toString()
  }

  return input
}