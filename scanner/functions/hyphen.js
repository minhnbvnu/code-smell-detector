function hyphen(obj) {
  if (obj instanceof String || typeof obj === 'string')
    return hyphenate(obj)
  function hyphenate(str) {
    return str.split('').map(function(c, i) {
      if (i !== 0 && c !== c.toLowerCase()) return '-' + c.toLowerCase()
      return c.toLowerCase()
    }).join('')
  }
  var ret = {}
  Object.keys(obj).map(function(key) {
    ret[hyphenate(key)] = obj[key]
  })
  return ret
}