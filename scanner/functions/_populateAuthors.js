function _populateAuthors (doc, jats, importer) {
  let authorEls = jats.findAll(`contrib-group[content-type=author] > contrib`)
  _populateContribs(doc, jats, importer, ['metadata', 'authors'], authorEls)
}