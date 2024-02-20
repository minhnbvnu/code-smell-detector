function journalArticleRenderer ($$, entityId, entityDb, exporter) {
  let entity = entityDb.get(entityId)
  let fragments = []

  if (entity.authors.length > 0) {
    fragments = fragments.concat(
      _renderAuthors($$, entity.authors, entityDb),
      '.'
    )
  }

  // We render an annotated article title here:
  if (entity.title) {
    fragments.push(
      ' ',
      ...exporter.annotatedText([entity.id, 'title'], entityDb, $$),
      '.'
    )
  }

  if (entity.editors.length > 0) {
    fragments = fragments.concat(
      ' ',
      _renderAuthors($$, entity.editors, entityDb),
      '.'
    )
  }
  if (entity.containerTitle) {
    fragments.push(
      ' ',
      $$('i').append(entity.containerTitle),
      '.'
    )
  }

  let date = _renderDate($$, entity.year, entity.month, entity.day, 'short')
  if (date) {
    fragments.push(' ', date, ';')
  }

  if (entity.volume) {
    fragments.push(entity.volume)
  }
  if (entity.issue) {
    fragments.push('(', entity.issue, ')')
  }

  let contentLocation = _renderLocation($$, entity.fpage, entity.lpage, entity.pageRange, entity.elocationId)
  if (contentLocation) {
    fragments.push(':', contentLocation, '.')
  } else {
    fragments.push('.')
  }

  if (entity.doi) {
    fragments.push(
      ' ',
      _renderDOI($$, entity.doi)
    )
  }

  if (entity.pmid) {
    fragments.push(' PMID ', entity.pmid)
  }
  return fragments
}