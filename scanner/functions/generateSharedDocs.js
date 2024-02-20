function generateSharedDocs() {
  const docs = docsConfig.sharedDocs
    .map(
      (fn) =>
        jsDocParser.getTemplateDataSync({
          files: fn.fullPath,
          'no-cache': true,
        })[0]
    )
    .map((doc) => ({
      type: 'jsdoc',
      kind: 'typedef',
      urlId: doc.name,
      category: doc.category,
      title: doc.name,
      description: doc.summary,
      content: doc,
      properties: paramsToTree(doc.properties),
    }))

  return Promise.resolve(docs)
}