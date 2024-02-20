function _populateArticleInfo (doc, jats, jatsImporter) {
  let articleEl = jats.find('article')
  let articleMetaEl = articleEl.find('front > article-meta')
  let metadata = doc.get('metadata')
  Object.assign(metadata, {
    articleType: articleEl.getAttribute('article-type') || '',
    elocationId: getText(articleMetaEl, 'elocation-id'),
    fpage: getText(articleMetaEl, 'fpage'),
    lpage: getText(articleMetaEl, 'lpage'),
    issue: getText(articleMetaEl, 'issue'),
    volume: getText(articleMetaEl, 'volume'),
    pageRange: getText(articleMetaEl, 'page-range')
  })
  let issueTitleEl = findChild(articleMetaEl, 'issue-title')
  if (issueTitleEl) {
    metadata['issueTitle'] = jatsImporter.annotatedText(issueTitleEl, ['metadata', 'issueTtle'])
  }
  // Import permission if present
  const permissionsEl = articleMetaEl.find('permissions')
  // An empty permission is already there, but will be replaced if <permission> element is there
  if (permissionsEl) {
    doc.delete(metadata.permission)
    let permission = jatsImporter.convertElement(permissionsEl)
    // ATTENTION: so that the document model is correct we need to use
    // the Document API  to set the permission id
    metadata.permission = permission.id
  }

  const articleDateEls = articleMetaEl.findAll('history > date, pub-date')
  if (articleDateEls.length > 0) {
    let dates = {}
    articleDateEls.forEach(dateEl => {
      const date = _extractDate(dateEl)
      dates[date.type] = date.value
    })
    Object.assign(metadata, dates)
  }
}