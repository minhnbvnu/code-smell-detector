function getTypeScriptFnDefinition(fn) {
  const { title, args, content } = fn

  const params = getParams(args, { leftBorder: '(', rightBorder: ')' })
  const returns = getType(content.returns[0].type.names)

  return formatBlock`
    function ${title} ${params}: ${returns}
    namespace ${title} {}
  `
}