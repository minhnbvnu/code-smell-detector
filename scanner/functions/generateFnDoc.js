function generateFnDoc(dirtyDoc) {
  const doc = cloneDeep(dirtyDoc)

  const isFPFn = false
  const { urlId, title } = doc
  const args = paramsToTree(doc.content.params)

  Object.assign(doc, {
    isFPFn,
    args,
    relatedDocs: {
      default: urlId,
      fp: `fp/${urlId}`,
      fpWithOptions: `fp/${urlId}WithOptions`,
    },
    usage: generateUsage(title, isFPFn),
    usageTabs: generateUsageTabs(isFPFn),
    syntax: generateSyntaxString(title, args, isFPFn),
  })

  if (!hasOptionsArg(doc)) {
    delete doc.relatedDocs.fpWithOptions
  }

  return doc
}