function getTypeScriptFPFnDefinition(fn) {
  const { title, args, content } = fn

  const type = getFPFnType(args, content.returns[0].type.names)

  return formatBlock`
    const ${title}: ${type}
    namespace ${title} {}
  `
}