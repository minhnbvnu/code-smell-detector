function softwareRenderer ($$, entityId, entityDb, exporter) {
  let entity = entityDb.get(entityId)
  let fragments = []

  if (entity.authors.length > 0) {
    fragments = fragments.concat(
      ' ',
      _renderAuthors($$, entity.authors, entityDb),
      '.'
    )
  }
  if (entity.title) {
    fragments.push(
      ' ',
      ...exporter.annotatedText([entity.id, 'title'], entityDb, $$),
      '.'
    )
  }
  if (entity.version) {
    fragments.push(' Version ', entity.version)
  }
  fragments.push('.')

  fragments.push(_renderPublisherPlace($$, entity.publisherLoc, entity.publisherName))

  let date = _renderDate($$, entity.year, entity.month, entity.day, 'short')
  if (date) {
    fragments.push(' ', date, ';')
  }

  if (entity.doi) {
    fragments.push(
      ' ',
      _renderDOI($$, entity.doi)
    )
  }

  return fragments
}