function chapterRenderer ($$, entityId, entityDb, exporter) {
  let entity = entityDb.get(entityId)
  let fragments = []

  if (entity.authors.length > 0) {
    fragments = fragments.concat(
      _renderAuthors($$, entity.authors, entityDb),
      '.'
    )
  }
  if (entity.translators.length) {
    fragments = fragments.concat(
      ' (',
      _renderAuthors($$, entity.translators, entityDb),
      ', trans).'
    )
  }
  if (entity.title) {
    fragments.push(
      ' ',
      ...exporter.annotatedText([entity.id, 'title'], entityDb, $$),
      '. '
    )
  }

  fragments = fragments.concat('In: ')
  if (entity.editors.length > 0) {
    let editorLabel = entity.editors.length > 1 ? 'eds' : 'ed'
    fragments = fragments.concat(
      ' ',
      _renderAuthors($$, entity.editors, entityDb),
      ', ',
      editorLabel,
      '.'
    )
  }
  if (entity.containerTitle) {
    fragments.push(
      ' ',
      $$('i').append(
        entity.containerTitle
      ),
      '.'
    )
  }
  if (entity.volume) {
    if (/^\d+$/.test(entity.volume)) {
      fragments.push(' ', entity.volume, '.')
    } else {
      fragments.push(' Vol ', entity.volume, '.')
    }
  }
  if (entity.edition) {
    fragments.push(' ', entity.edition, '.')
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
  return fragments
}