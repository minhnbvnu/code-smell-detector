function jsonParse (jsonSample, prefix, array) {
  for (let key in jsonSample) {
    let data = {}
    if (jsonSample[key] && typeof jsonSample[key] === 'object') {
      if (jsonSample[key] instanceof Array) {
        prefix = prefix !== '' ? `${prefix}#${key}` : key
        data['fieldName'] = prefix
        data['fieldType'] = 'array'
      } else {
        prefix = prefix !== '' ? `${prefix}#${key}` : key
        data['fieldName'] = prefix
        data['fieldType'] = JSONOBJECT
      }
      array.push(data)
      jsonParse(jsonSample[key], prefix, array)
      const prefixArray = prefix.split('#')
      prefixArray.pop()
      prefix = prefixArray.join('#')
    } else {
      const fieldName = prefix !== '' ? `${prefix}#${key}` : key
      data['fieldName'] = fieldName
      const fieldType = typeof jsonSample[key]
      data['fieldType'] = fieldType === 'number' ? getDefaultNumType(jsonSample[key]) : fieldType
      array.push(data)
    }
  }
  return genFinalNameAndType(array)
}