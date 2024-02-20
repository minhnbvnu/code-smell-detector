function generateDocsFromSource() {
  const docs = listFns()
    .map(
      (fn) =>
        jsDocParser.getTemplateDataSync({
          files: fn.fullPath,
          'no-cache': true,
        })[0]
    )
    .map((doc) => ({
      type: 'jsdoc',
      kind: 'function',
      urlId: doc.name,
      category: doc.category,
      title: doc.name,
      description: doc.summary,
      content: doc,
    }))
    .reduce((array, doc) => {
      array = array.concat(generateFnDoc(doc)).concat(generateFPFnDoc(doc))
      if (hasOptionsArg(doc)) {
        array = array.concat(generateFPFnWithOptionsDoc(doc))
      }
      return array
    }, [])

  return Promise.resolve(docs)
}