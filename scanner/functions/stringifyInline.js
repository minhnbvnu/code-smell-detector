function stringifyInline (value, type) {
  /* istanbul ignore if */
  if (!type) type = tomlType(value)
  switch (type) {
    case 'string-multiline':
      return stringifyMultilineString(value)
    case 'string':
      return stringifyBasicString(value)
    case 'string-literal':
      return stringifyLiteralString(value)
    case 'integer':
      return stringifyInteger(value)
    case 'float':
      return stringifyFloat(value)
    case 'boolean':
      return stringifyBoolean(value)
    case 'datetime':
      return stringifyDatetime(value)
    case 'array':
      return stringifyInlineArray(value.filter(_ => tomlType(_) !== 'null' && tomlType(_) !== 'undefined' && tomlType(_) !== 'nan'))
    case 'table':
      return stringifyInlineTable(value)
    /* istanbul ignore next */
    default:
      throw typeError(type)
  }
}