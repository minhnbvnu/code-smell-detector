function webpageRenderer ($$, entityId, entityDb, exporter) {
  let entity = entityDb.get(entityId)
  let fragments = []

  if (entity.authors.length > 0) {
    fragments = fragments.concat(
      _renderAuthors($$, entity.authors, entityDb),
      '.'
    )
  }
  if (entity.title) {
    fragments.push(
      ' ',
      ...exporter.annotatedText([entity.id, 'title'], entityDb, $$),
      '. '
    )
  }

  if (entity.publisherLoc) {
    fragments.push(' ', entity.publisherLoc)
  }

  if (entity.uri) {
    fragments.push(
      ' ',
      $$('a').attr({
        href: entity.uri,
        target: '_blank'
      }).append(
        entity.uri
      )
    )
  }

  if (entity.year) {
    let dateFormatted = _renderDate($$, entity.year, entity.month, entity.day, 'long')
    fragments.push('. Accessed ', dateFormatted, '.')
  }

  return fragments
}