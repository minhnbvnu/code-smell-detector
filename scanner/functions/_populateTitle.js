function _populateTitle (doc, jats, jatsImporter) {
  let article = doc.get('article')
  let titleEl = jats.find('article > front > article-meta > title-group > article-title')
  if (titleEl) {
    article.title = jatsImporter.annotatedText(titleEl, ['article', 'title'])
  }
  // FIXME: bring back translations
  // translations
  // let transTitleEls = jats.findAll('article > front > article-meta > title-group > trans-title-group > trans-title')
  // for (let transTitleEl of transTitleEls) {
  //   let group = transTitleEl.parentNode
  //   let language = group.attr('xml:lang')
  //   let translation = doc.create({
  //     type: 'article-title-translation',
  //     id: transTitleEl.id,
  //     source: ['article', 'title'],
  //     language
  //   })
  //   translation.content = jatsImporter.annotatedText(transTitleEl, translation.getPath())
  //   documentHelpers.append(doc, ['article', 'translations'], translation.id)
  // }
}