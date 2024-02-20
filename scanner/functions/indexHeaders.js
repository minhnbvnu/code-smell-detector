function indexHeaders (headers) {
  const map = new Map()
  for (var i = 0; i < headers.length; i += 2) map.set(headers[i].toLowerCase(), headers[i + 1])
  return map
}