function dataPublicationRenderer ($$, entityId, entityDb, exporter) {
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

  if (entity.containerTitle) {
    fragments.push(
      ' ',
      $$('i').append(entity.containerTitle),
      '.'
    )
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
  if (entity.arkId) {
    fragments.push(' ', entity.arkId)
  }
  if (entity.archiveId) {
    fragments.push(' ', entity.archiveId)
  }
  if (entity.accessionId) {
    fragments.push(' ', entity.accessionId)
  }
  return fragments
}