function generateFPFnWithOptionsDoc(dirtyDoc) {
  const doc = cloneDeep(dirtyDoc)

  const isFPFn = true
  const { urlId, title } = doc
  const params = doc.content.params
    .map((param) => {
      if (!param.name.includes('.')) {
        param.optional = false
      }
      return param
    })
    .reverse()
  const args = paramsToTree(params)

  return Object.assign(doc, {
    isFPFn,
    args,
    generatedFrom: title,
    title: `${title}WithOptions`,
    urlId: `fp/${urlId}WithOptions`,
    relatedDocs: {
      default: urlId,
      fp: `fp/${urlId}`,
      fpWithOptions: `fp/${urlId}WithOptions`,
    },
    usage: generateUsage(title, isFPFn),
    usageTabs: generateUsageTabs(isFPFn),
    syntax: generateSyntaxString(title, args, isFPFn),

    content: Object.assign(doc.content, {
      params,
      id: `${doc.content.id}WithOptions`,
      longname: `${doc.content.longname}WithOptions`,
      name: `${doc.content.name}WithOptions`,
      examples: 'See [FP Guide](https://date-fns.org/docs/FP-Guide) for more information',
    }),
  })
}