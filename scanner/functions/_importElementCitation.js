function _importElementCitation (el, node, doc, importer) {
  const type = el.attr('publication-type')
  node.type = JATS_BIBR_TYPES_TO_INTERNAL[type]

  Object.assign(node, {
    assignee: getText(el, 'collab[collab-type=assignee] > named-content'),
    confName: getText(el, 'conf-name'),
    confLoc: getText(el, 'conf-loc'),
    day: getText(el, 'day'),
    edition: getText(el, 'edition'),
    elocationId: getText(el, 'elocation-id'),
    fpage: getText(el, 'fpage'),
    issue: getText(el, 'issue'),
    lpage: getText(el, 'lpage'),
    month: getText(el, 'month'),
    pageCount: getText(el, 'page-count'),
    pageRange: getText(el, 'page-range'),
    partTitle: getText(el, 'part-title'),
    patentCountry: getAttr(el, 'patent', 'country'),
    patentNumber: getText(el, 'patent'),
    publisherLoc: getSeparatedText(el, 'publisher-loc'),
    publisherName: getSeparatedText(el, 'publisher-name'),
    series: getText(el, 'series'),
    uri: getText(el, 'uri'),
    version: getText(el, 'version'),
    volume: getText(el, 'volume'),
    year: getText(el, 'year'),
    accessedDate: getAttr(el, 'date-in-citation', 'iso-8601-date'),
    // identifiers
    accessionId: getText(el, 'pub-id[pub-id-type=accession]'),
    archiveId: getText(el, 'pub-id[pub-id-type=archive]'),
    arkId: getText(el, 'pub-id[pub-id-type=ark]'),
    isbn: getText(el, 'pub-id[pub-id-type=isbn]'),
    doi: getText(el, 'pub-id[pub-id-type=doi]'),
    pmid: getText(el, 'pub-id[pub-id-type=pmid]')
  })

  if (type === 'book' || type === 'report' || type === 'software') {
    node.title = getAnnotatedText(importer, el, 'source', [node.id, 'title'])
  } else {
    node.containerTitle = getText(el, 'source')
    if (type === 'chapter') {
      node.title = getAnnotatedText(importer, el, 'chapter-title', [node.id, 'title'])
    } else if (type === 'data') {
      node.title = getAnnotatedText(importer, el, 'data-title', [node.id, 'title'])
    } else {
      node.title = getAnnotatedText(importer, el, 'article-title', [node.id, 'title'])
    }
  }

  node.authors = _importPersonGroup(el, doc, 'author')
  node.editors = _importPersonGroup(el, doc, 'editor')
  node.inventors = _importPersonGroup(el, doc, 'inventor')
  node.sponsors = _importPersonGroup(el, doc, 'sponsor')
  node.translators = _importPersonGroup(el, doc, 'translator')
}