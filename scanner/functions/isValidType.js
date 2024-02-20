function isValidType(val) {
  return VALID_ATTR_TYPES.has(typeof val)
}