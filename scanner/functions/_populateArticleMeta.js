function _populateArticleMeta (jats, doc, jatsExporter) {
  const $$ = jats.$$
  let articleMeta = jats.createElement('article-meta')
  let metadata = doc.get('metadata')
  let permission = doc.get(metadata.permission)

  // article-id*
  // TODO not supported yet

  // article-categories?
  articleMeta.append(_exportSubjects(jats, doc))

  // title-group?
  articleMeta.append(_exportTitleGroup(jats, doc, jatsExporter))

  // contrib-group*
  ;[
    ['author', ['metadata', 'authors']],
    ['editor', ['metadata', 'editors']]
  ].forEach(([type, collectionPath]) => {
    articleMeta.append(
      _exportContribGroup(jats, doc, jatsExporter, collectionPath, type)
    )
  })

  // aff*
  articleMeta.append(_exportAffiliations(jats, doc))

  // author-notes? // not supported yet

  // pub-date*,
  articleMeta.append(
    _exportDate($$, metadata, 'publishedDate', 'pub', 'pub-date')
  )

  // volume?,
  if (metadata.volume) {
    articleMeta.append($$('volume').append(metadata.volume))
  }

  // issue?,
  if (metadata.issue) {
    articleMeta.append($$('issue').append(metadata.issue))
  }

  // issue-title?,
  if (metadata.issueTitle) {
    articleMeta.append(
      $$('issue-title').append(
        jatsExporter.annotatedText(['metadata', 'issueTitle'])
      )
    )
  }

  // isbn?, // not supported yet

  // (((fpage,lpage?)?,page-range?)|elocation-id)?,
  if (metadata.elocationId) {
    articleMeta.append(
      $$('elocation-id').append(metadata.elocationId)
    )
  } else if (metadata.fpage && metadata.lpage) {
    // NOTE: last argument is used to resolve insert position, as we don't have means
    // yet to ask for insert position of multiple elements
    let pageRange = metadata.pageRange || metadata.fpage + '-' + metadata.lpage
    articleMeta.append(
      $$('fpage').append(metadata.fpage),
      $$('lpage').append(metadata.lpage),
      $$('page-range').append(pageRange)
    )
  }

  // history?,
  const historyEl = $$('history')
  historyEl.append(_exportDate($$, metadata, 'acceptedDate', 'accepted'))
  historyEl.append(_exportDate($$, metadata, 'receivedDate', 'received'))
  historyEl.append(_exportDate($$, metadata, 'revReceivedDate', 'rev-recd'))
  historyEl.append(_exportDate($$, metadata, 'revRequestedDate', 'rev-request'))
  // do not export <history> tag if there is no dates inside
  if (historyEl.getChildCount() > 0) {
    articleMeta.append(historyEl)
  }

  // permissions?,
  if (permission && !permission.isEmpty()) {
    articleMeta.append(
      jatsExporter.convertNode(permission)
    )
  }

  // self-uri*,        // not supported yet

  // related-article*, // not supported yet

  // related-object*,  // not supported yet

  // abstract?,
  articleMeta.append(
    _exportAbstract(jats, doc, jatsExporter)
  )

  // trans-abstract*, // not yet supported

  // kwd-group*,
  articleMeta.append(
    _exportKeywords(jats, doc, jatsExporter)
  )

  // funding-group*,
  articleMeta.append(
    _exportFunders(jats, doc)
  )

  // conference*,      // not supported yet

  // counts?,          // not supported yet

  // custom-meta-group?  // not supported yet

  // replace the <article-meta> element
  let front = jats.find('article > front')
  let oldArticleMeta = front.find('article-meta')
  front.replaceChild(oldArticleMeta, articleMeta)
}