function generateFlowFPFnIndexTyping(fns, aliasDeclarations) {
  const fnsDeclarations = fns.map(
    ({ title, args, content }) => `${title}: ${getFPFnType(args, content.returns[0].type.names)}`
  )

  const typingFile = formatFlowFile`
    ${addSeparator(aliasDeclarations, '\n')}

    ${addSeparator(getFlowFPTypeAliases(), '\n')}

    declare module.exports: {
      ${addSeparator(fnsDeclarations, ',')}
    }
  `

  writeFile(`src/fp/index.js.flow`, typingFile)
}