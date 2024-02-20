function internal2jats (doc, jatsExporter) { // eslint-disable-line
  let jats = createEmptyJATS()
  jats.$$ = jats.createElement.bind(jats)

  // metadata
  _populateMeta(jats, doc, jatsExporter)
  _populateBody(jats, doc, jatsExporter)
  _populateBack(jats, doc, jatsExporter)

  return jats
}