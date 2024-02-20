function generateFPFnDoc(dirtyDoc) {
  const doc = cloneDeep(dirtyDoc)

  const isFPFn = true
  const { urlId, title } = doc
  const exceptions =
    (doc.content.exceptions &&
      doc.content.exceptions.filter((exception) => !exception.description.includes('options.'))) ||
    []
  const params = doc.content.params.filter((param) => !param.name.startsWith('options')).reverse()
  const args = paramsToTree(params)

  Object.assign(doc, {
    isFPFn,
    args,
    generatedFrom: title,
    urlId: `fp/${urlId}`,
    relatedDocs: {
      default: urlId,
      fp: `fp/${urlId}`,
      fpWithOptions: `fp/${urlId}WithOptions`,
    },
    usage: generateUsage(title, isFPFn),
    usageTabs: generateUsageTabs(isFPFn),
    syntax: generateSyntaxString(title, args, isFPFn),

    content: Object.assign(doc.content, {
      exceptions,
      params,
      examples: 'See [FP Guide](https://date-fns.org/docs/FP-Guide) for more information',
    }),
  })

  if (!hasOptionsArg(doc)) {
    delete doc.relatedDocs.fpWithOptions
  }

  return doc
}