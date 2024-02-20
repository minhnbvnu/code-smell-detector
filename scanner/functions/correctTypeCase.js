function correctTypeCase(type) {
  if (lowerCaseTypes.includes(type)) {
    return type.toLowerCase()
  }
  return type
}