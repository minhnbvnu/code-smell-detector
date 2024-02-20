function _importBody (bodyEl) {
  // TODO: create a minimal document, and the JATS importer
  // then run the converter and see if the body node has the proper content
  let doc = createEmptyArticle()
  let importer = createJatsImporter(doc)
  // ATTENTION: same as in the real jats2internal converter we must use a temporary id
  // here, because the body node already exists
  bodyEl.id = uuid()
  let tmpBody = importer.convertElement(bodyEl)
  let body = doc.get('body')
  doc.set(['body', 'content'], tmpBody.content)
  return body
}