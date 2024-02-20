function reportRenderer ($$, entityId, entityDb, exporter) {
  let entity = entityDb.get(entityId)
  let fragments = []
  if (entity.authors.length > 0) {
    fragments = fragments.concat(
      _renderAuthors($$, entity.authors, entityDb),
      '. '
    )
  }

  if (entity.sponsors.length > 0) {
    fragments = fragments.concat(
      _renderAuthors($$, entity.sponsors, entityDb),
      ', sponsors. '
    )
  }

  if (entity.title) {
    fragments.push(
      $$('i').append(entity.title),
      '.'
    )
  }

  fragments.push(_renderPublisherPlace($$, entity.publisherLoc, entity.publisherName))

  if (entity.series) {
    fragments.push(' (', entity.series, ')')
  }

  if (entity.year) {
    fragments.push(' ', entity.year)
    if (entity.month) {
      fragments.push(' ', _renderMonth(entity.month, 'short'))
    }
    fragments.push('.')
  }

  if (entity.doi) {
    fragments.push(
      ' ',
      _renderDOI($$, entity.doi)
    )
  }

  return fragments
}