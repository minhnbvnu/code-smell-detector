function _populateKeywords (doc, jats, jatsImporter) {
  let kwdEls = jats.findAll('article > front > article-meta > kwd-group > kwd')
  let kwdIds = kwdEls.map(kwdEl => {
    const kwd = doc.create({
      type: 'keyword',
      category: kwdEl.getAttribute('content-type'),
      language: kwdEl.getParent().getAttribute('xml:lang')
    })
    kwd.name = jatsImporter.annotatedText(kwdEl, [kwd.id, 'name'])
    return kwd.id
  })
  doc.get('metadata').keywords = kwdIds
}