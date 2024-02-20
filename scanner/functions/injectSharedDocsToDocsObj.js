function injectSharedDocsToDocsObj(docsFileObj) {
  return generateSharedDocs()
    .then((sharedDocs) => {
      sharedDocs.forEach((sharedDoc) => {
        docsFileObj[sharedDoc.category].push(sharedDoc)
      })
      return docsFileObj
    })
    .catch(reportErrors)
}