function resolveDataTitle(string) {
  var adjusted = string.toLowerCase().replace(/\s/g, '').replace(/\W/g, '')
  return adjusted
}