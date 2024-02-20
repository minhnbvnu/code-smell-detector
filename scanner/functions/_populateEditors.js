function _populateEditors (doc, jats, importer) {
  let editorEls = jats.findAll(`contrib-group[content-type=editor] > contrib`)
  _populateContribs(doc, jats, importer, ['metadata', 'editors'], editorEls)
}