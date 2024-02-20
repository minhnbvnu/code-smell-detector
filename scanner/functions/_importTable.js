function _importTable (el) {
  // TODO: create a minimal document, and the JATS importer
  // then run the converter and see if the body node has the proper content
  let doc = createEmptyArticle()
  let importer = createJatsImporter(doc)
  return importer.convertElement(el)
}