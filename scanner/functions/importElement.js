function importElement (el) {
  let doc = createEmptyArticle()
  let importer = createJatsImporter(doc)
  return importer.convertElement(el)
}