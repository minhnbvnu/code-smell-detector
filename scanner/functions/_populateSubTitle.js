function _populateSubTitle (doc, jats, jatsImporter) {
  let article = doc.get('article')
  let subTitleEl = jats.find('article > front > article-meta > title-group > subtitle')
  if (subTitleEl) {
    article.subTitle = jatsImporter.annotatedText(subTitleEl, ['article', 'subTitle'])
  }
}