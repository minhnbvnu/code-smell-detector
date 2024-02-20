function _populateFootnotes (doc, jats, jatsImporter) {
  let $$ = jats.createElement.bind(jats)
  let fnEls = jats.findAll('article > back > fn-group > fn')
  let article = doc.get('article')
  article.footnotes = fnEls.map(fnEl => {
    // there must be at least one paragraph
    if (!fnEl.find('p')) {
      fnEl.append($$('p'))
    }
    return jatsImporter.convertElement(fnEl).id
  })
}