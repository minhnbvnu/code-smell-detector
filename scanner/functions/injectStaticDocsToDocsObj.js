function injectStaticDocsToDocsObj(docsFileObj) {
  return getListOfStaticDocs()
    .then((staticDocs) => {
      staticDocs.forEach((staticDoc) => {
        docsFileObj[staticDoc.category].push(staticDoc)
      })
      return docsFileObj
    })
    .catch(reportErrors)
}