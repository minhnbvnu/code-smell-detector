function _populateAbstract (doc, jats, jatsImporter) {
  let $$ = jats.createElement.bind(jats)
  let sectionContainerConverter = new SectionContainerConverter()

  // NOTE: The first abstract without abstract-type is used as main abstract,
  // if there are others they should be imported as a custom abstract
  // as well as abstracts with abstract-type attribute
  let mainAbstract = doc.get('abstract')
  let abstractEls = jats.findAll('article > front > article-meta > abstract')
  let mainAbstractImported = false
  abstractEls.forEach(abstractEl => {
    const titleEl = findChild(abstractEl, 'title')
    if (titleEl) {
      abstractEl.removeChild(titleEl)
    }
    // if the abstract is empty, add an empty paragraph
    if (abstractEl.getChildCount() === 0) {
      abstractEl.append($$('p'))
    }
    const abstractType = abstractEl.attr('abstract-type')
    if (!abstractType && !mainAbstractImported) {
      sectionContainerConverter.import(abstractEl, mainAbstract, jatsImporter)
      mainAbstractImported = true
    } else {
      let abstract = doc.create({
        type: 'custom-abstract',
        id: abstractEl.id,
        abstractType: abstractType
      })
      sectionContainerConverter.import(abstractEl, abstract, jatsImporter)
      if (titleEl) {
        abstract.title = jatsImporter.annotatedText(titleEl, [abstract.id, 'title'])
      }
      documentHelpers.append(doc, ['article', 'customAbstracts'], abstract.id)
    }
  })

  // FIXME: bring back translations
  // translations
  // let transAbstractEls = jats.findAll('article > front > article-meta > trans-abstract')
  // for (let transAbstractEl of transAbstractEls) {
  //   let language = transAbstractEl.attr('xml:lang')
  //   let translation = doc.create({
  //     type: 'article-abstract-translation',
  //     id: transAbstractEl.id,
  //     source: [mainAbstract.id, 'content'],
  //     language,
  //     content: transAbstractEl.getChildren().map(child => {
  //       return jatsImporter.convertElement(child).id
  //     })
  //   })
  //   documentHelpers.append(doc, ['article', 'translations'], translation.id)
  // }
}