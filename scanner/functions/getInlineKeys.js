function getInlineKeys (obj) {
  return Object.keys(obj).filter(key => isInline(obj[key]))
}