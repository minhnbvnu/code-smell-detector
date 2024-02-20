function getDefaultNumType (value) {
  value = `${value}`
  if (!value.includes('.')) {
    return LONG
  } else {
    return DOUBLE
  }
}