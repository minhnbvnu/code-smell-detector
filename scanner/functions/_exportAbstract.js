function _exportAbstract (jats, doc, jatsExporter) {
  const $$ = jats.$$
  let sectionContainerConverter = new SectionContainerConverter()
  let abstract = doc.get('abstract')
  let els = []
  // Main abstract
  let abstractEl = $$('abstract')
  // the abstract element itself is required
  // but we skip empty content
  if (!_isContainerEmpty(abstract, 'content')) {
    sectionContainerConverter.export(abstract, abstractEl, jatsExporter)
  }
  els.push(abstractEl)
  // Custom abstracts
  doc.resolve(['article', 'customAbstracts']).forEach(customAbstract => {
    let customAbstractEl = $$('abstract')
    if (customAbstract.abstractType) {
      customAbstractEl.attr('abstract-type', customAbstract.abstractType)
    }
    if (customAbstract.title) {
      let titleEl = $$('title')
      _exportAnnotatedText(jatsExporter, [customAbstract.id, 'title'], titleEl)
      customAbstractEl.append(titleEl)
    }
    if (!_isContainerEmpty(customAbstract, 'content')) {
      sectionContainerConverter.export(customAbstract, customAbstractEl, jatsExporter)
    }
    els.push(customAbstractEl)
  })

  return els
}