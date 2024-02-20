function generateFlowTypings(fns, aliases) {
  const aliasDeclarations = aliases.map(getFlowTypeAlias)

  fns.forEach((fn) => {
    if (fn.isFPFn) {
      generateFlowFPFnTyping(fn, aliasDeclarations)
    } else {
      generateFlowFnTyping(fn, aliasDeclarations)
    }
  })

  generateFlowFnIndexTyping(
    fns.filter(({ isFPFn }) => !isFPFn),
    aliasDeclarations
  )
  generateFlowFPFnIndexTyping(
    fns.filter(({ isFPFn }) => isFPFn),
    aliasDeclarations
  )
}