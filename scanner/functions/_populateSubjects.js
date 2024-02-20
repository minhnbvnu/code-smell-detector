function _populateSubjects (doc, jats) {
  // TODO: IMO we need to consolidate this. The original meaning of <subj-group> seems to be
  // to be able to define an ontology, also hierarchically
  // This implementation assumes that subjects are flat.
  // To support translations, multiple subj-groups can be provided with different xml:lang
  let subjGroups = jats.findAll('article > front > article-meta > article-categories > subj-group')
  // TODO: get this from the article element
  const DEFAULT_LANG = 'en'
  for (let subjGroup of subjGroups) {
    let language = subjGroup.attr('xml:lang') || DEFAULT_LANG
    let subjectEls = subjGroup.findAll('subject')
    for (let subjectEl of subjectEls) {
      let subject = doc.create({
        type: 'subject',
        name: subjectEl.textContent,
        category: subjectEl.getAttribute('content-type'),
        language
      })
      documentHelpers.append(doc, ['metadata', 'subjects'], subject.id)
    }
  }
}