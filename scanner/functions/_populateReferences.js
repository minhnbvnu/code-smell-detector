function _populateReferences (doc, jats, jatsImporter) {
  // TODO: make sure that we only allow this place for references via restricting the TextureJATS schema
  let refListEl = jats.find('article > back > ref-list')
  if (refListEl) {
    let article = doc.get('article')
    let refEls = refListEl.findAll('ref')
    article.references = refEls.map(refEl => jatsImporter.convertElement(refEl).id)
  }
}