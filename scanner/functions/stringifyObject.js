function stringifyObject (prefix, indent, obj) {
  obj = toJSON(obj)
  var inlineKeys
  var complexKeys
  inlineKeys = getInlineKeys(obj)
  complexKeys = getComplexKeys(obj)
  var result = []
  var inlineIndent = indent || ''
  inlineKeys.forEach(key => {
    var type = tomlType(obj[key])
    if (type !== 'undefined' && type !== 'null') {
      result.push(inlineIndent + stringifyKey(key) + ' = ' + stringifyAnyInline(obj[key], true))
    }
  })
  if (result.length > 0) result.push('')
  var complexIndent = prefix && inlineKeys.length > 0 ? indent + '  ' : ''
  complexKeys.forEach(key => {
    result.push(stringifyComplex(prefix, complexIndent, key, obj[key]))
  })
  return result.join('\n')
}