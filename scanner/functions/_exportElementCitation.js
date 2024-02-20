function _exportElementCitation (node, exporter) {
  const $$ = exporter.$$
  const doc = node.getDocument()
  const type = node.type
  let el = $$('element-citation').attr('publication-type', INTERNAL_BIBR_TYPES_TO_JATS[type])
  if (node.assignee) {
    el.append(
      $$('collab').attr('collab-type', 'assignee').append(
        $$('named-content').attr({ 'content-type': 'name' }).text(node.assignee)
      )
    )
  }
  el.append(_createTextElement($$, node.confName, 'conf-name'))
  el.append(_createTextElement($$, node.confLoc, 'conf-loc'))
  el.append(_createTextElement($$, node.day, 'day'))
  el.append(_createTextElement($$, node.edition, 'edition'))
  el.append(_createTextElement($$, node.elocationId, 'elocation-id'))
  el.append(_createTextElement($$, node.fpage, 'fpage'))
  el.append(_createTextElement($$, node.issue, 'issue'))
  el.append(_createTextElement($$, node.lpage, 'lpage'))
  el.append(_createTextElement($$, node.month, 'month'))
  el.append(_createTextElement($$, node.pageCount, 'page-count'))
  el.append(_createTextElement($$, node.pageRange, 'page-range'))
  el.append(_createTextElement($$, node.partTitle, 'part-title'))
  el.append(_createTextElement($$, node.patentNumber, 'patent', { 'country': node.patentCountry }))
  el.append(_createMultipleTextElements($$, node.publisherLoc, 'publisher-loc'))
  el.append(_createMultipleTextElements($$, node.publisherName, 'publisher-name'))
  el.append(_createTextElement($$, node.uri, 'uri'))
  el.append(_createTextElement($$, node.accessedDate, 'date-in-citation', { 'iso-8601-date': node.accessedDate }))
  el.append(_createTextElement($$, node.version, 'version'))
  el.append(_createTextElement($$, node.volume, 'volume'))
  el.append(_createTextElement($$, node.year, 'year'))
  // identifiers
  el.append(_createTextElement($$, node.accessionId, 'pub-id', { 'pub-id-type': 'accession' }))
  el.append(_createTextElement($$, node.arkId, 'pub-id', { 'pub-id-type': 'ark' }))
  el.append(_createTextElement($$, node.archiveId, 'pub-id', { 'pub-id-type': 'archive' }))
  el.append(_createTextElement($$, node.isbn, 'pub-id', { 'pub-id-type': 'isbn' }))
  el.append(_createTextElement($$, node.doi, 'pub-id', { 'pub-id-type': 'doi' }))
  el.append(_createTextElement($$, node.pmid, 'pub-id', { 'pub-id-type': 'pmid' }))
  // creators
  el.append(_exportPersonGroup($$, doc, node.authors, 'author'))
  el.append(_exportPersonGroup($$, doc, node.editors, 'editor'))
  el.append(_exportPersonGroup($$, doc, node.inventors, 'inventor'))
  el.append(_exportPersonGroup($$, doc, node.sponsors, 'sponsor'))

  if (type === BOOK_REF || type === REPORT_REF || type === SOFTWARE_REF) {
    el.append(_exportAnnotatedText(exporter, [node.id, 'title'], 'source'))
  } else {
    el.append(_createTextElement($$, node.containerTitle, 'source'))
    if (type === CHAPTER_REF) {
      el.append(
        _exportAnnotatedText(exporter, [node.id, 'title'], 'chapter-title')
      )
    } else if (type === DATA_PUBLICATION_REF) {
      el.append(
        _exportAnnotatedText(exporter, [node.id, 'title'], 'data-title')
      )
    } else {
      el.append(
        _exportAnnotatedText(exporter, [node.id, 'title'], 'article-title')
      )
    }
  }
  return el
}