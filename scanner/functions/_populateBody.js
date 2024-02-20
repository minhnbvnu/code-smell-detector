function _populateBody (doc, jats, jatsImporter) {
  let $$ = jats.createElement.bind(jats)
  // ATTENTION: JATS can have multiple abstracts
  // ATM we only take the first, loosing the others
  let bodyEl = jats.find('article > body')
  if (bodyEl) {
    // add an empty paragraph if the body is empty
    if (bodyEl.getChildCount() === 0) {
      bodyEl.append($$('p'))
    }
    let body = doc.get('body')
    // ATTENTION: because there is already a body node in the document, *the* body, with id 'body'
    // we must change the id of the body element so that it does not collide with the internal one
    bodyEl.id = uuid()
    let tmp = jatsImporter.convertElement(bodyEl)
    let ids = tmp.content.slice()
    tmp.content = []
    body.content = ids
    doc.delete(tmp)
  }
}