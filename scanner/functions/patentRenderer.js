function patentRenderer ($$, entityId, entityDb, exporter) {
  let entity = entityDb.get(entityId)
  let fragments = []

  if (entity.inventors.length > 0) {
    fragments = fragments.concat(
      _renderAuthors($$, entity.inventors, entityDb),
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

  if (entity.assignee) {
    fragments.push(' ', entity.assignee, ',')
  }
  let date = _renderDate($$, entity.year, entity.month, entity.day, 'short')
  if (date) {
    fragments.push(' ', date, ';')
  }
  if (entity.patentNumber) {
    fragments.push(' ', entity.patentNumber)
  }
  if (entity.patentCountry) {
    fragments.push(' (', entity.patentCountry, ').')
  }
  return fragments
}