function interpretError (code, bindings) {
  var template = ecodes[code]
  Object.keys(bindings).forEach(function (key) {
    template = template.replace('{' + key + '}', bindings[key])
  })
  return template
}