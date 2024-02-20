function generateFlowFnTyping(fn, aliasDeclarations) {
  const { title, args, content } = fn

  const params = getParams(args, { leftBorder: '(', rightBorder: ')' })
  const returns = getType(content.returns[0].type.names)

  const moduleDeclaration = `declare module.exports: ${params} => ${returns}`

  const typingFile = formatFlowFile`
    ${addSeparator(aliasDeclarations, '\n')}

    ${moduleDeclaration}
  `

  writeFile(`src/${title}/index.js.flow`, typingFile)
}