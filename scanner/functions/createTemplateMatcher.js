function createTemplateMatcher (fields) {
  const length = fields.length
  const pattern = fields.reduce(function (pattern, field, i) {
    if (i === 0) {
      pattern = '^'
    }
    if (field.prefix) {
      pattern += '(' + escapeRegExp(field.prefix) + ')'
    }
    if (field.placeholder) {
      switch (field.placeholder) {
        case 'hash':
        case 'fullhash':
        case 'chunkhash':
          pattern += '[0-9a-fA-F]'
          pattern += field.width ? '{1,' + field.width + '}' : '+'
          break
        case 'id':
        case 'name':
        case 'file':
        case 'filebase':
          pattern += '.+?'
          break
        case 'query':
          pattern += '(?:\\?.+?)?'
          break
      }
    }
    if (i === length - 1) {
      pattern += '$'
    }

    return pattern
  }, '')

  return new RegExp(pattern)
}