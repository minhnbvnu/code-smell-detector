function generateFlowFPFnTyping(fn, aliasDeclarations) {
  const { title, args, content } = fn

  const type = getFPFnType(args, content.returns[0].type.names)

  const typingFile = formatFlowFile`
    ${addSeparator(aliasDeclarations, '\n')}

    ${addSeparator(getFlowFPTypeAliases(args.length), '\n')}

    declare module.exports: ${type}
  `

  writeFile(`src/fp/${title}/index.js.flow`, typingFile)
}