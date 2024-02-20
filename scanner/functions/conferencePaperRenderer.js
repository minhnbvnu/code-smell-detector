function conferencePaperRenderer ($$, entityId, entityDb, exporter) {
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
    fragments.push(' ', $$('i').append(entity.containerTitle), '.')
  }

  if (entity.confName && entity.confLoc) {
    fragments.push(' ', entity.confName, '; ', entity.confLoc, '.')
  } else if (entity.confName) {
    fragments.push(' ', entity.confName, '.')
  } else if (entity.confLoc) {
    fragments.push(' ', entity.confLoc, '.')
  }

  if (entity.year) {
    fragments.push(' ', entity.year)
    if (entity.month) {
      fragments.push(' ', _renderMonth(entity.month, 'short'))
    }
  }

  let contentLocation = _renderLocation($$, entity.fpage, entity.lpage, entity.pageRange, entity.elocationId)
  if (contentLocation) {
    fragments.push(', ', contentLocation, '.')
  } else {
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