function _populateBack (jats, doc, jatsExporter) {
  let $$ = jats.$$
  let backEl = jats.find('article > back')
  /*
    back:
    (
      fn-group?,
      ref-list?,
    )
  */
  let footnotes = doc.resolve(['article', 'footnotes'])
  if (footnotes.length > 0) {
    backEl.append(
      $$('fn-group').append(
        footnotes.map(footnote => {
          return jatsExporter.convertNode(footnote)
        })
      )
    )
  }

  let references = doc.resolve(['article', 'references'])
  if (references.length > 0) {
    backEl.append(
      $$('ref-list').append(
        references.map(ref => {
          return jatsExporter.convertNode(ref)
        })
      )
    )
  }
}