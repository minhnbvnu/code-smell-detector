function _populateMeta (jats, doc, jatsExporter) {
  // TODO: journal-meta would go here, but is not supported yet

  // @article-type
  let articleEl = jats.find('article')
  let metadata = doc.get('metadata')
  if (metadata.articleType) {
    articleEl.attr('article-type', metadata.articleType)
  }

  _populateArticleMeta(jats, doc, jatsExporter)

  // TODO: def-list would go here, but is not supported yet
}