function getListOfStaticDocs() {
  return Promise.all(
    docsConfig.staticDocs.map((staticDoc) => {
      return fsp
        .readFile(staticDoc.path)
        .then((docContent) => docContent.toString())
        .then((content) => Object.assign({ content }, staticDoc))
        .catch(reportErrors)
    })
  )
}