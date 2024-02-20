function generateFlowFnIndexTyping(fns, aliasDeclarations) {
  const fnsDeclarations = fns.map(({ title, args, content }) => {
    const params = getParams(args, { leftBorder: '(', rightBorder: ')' })
    const returns = getType(content.returns[0].type.names)
    return `${title}: ${params} => ${returns}`
  })

  const typingFile = formatFlowFile`
    ${addSeparator(aliasDeclarations, '\n')}

    declare module.exports: {
      ${addSeparator(fnsDeclarations, ',\n')}
    }
  `

  writeFile(`src/index.js.flow`, typingFile)
}