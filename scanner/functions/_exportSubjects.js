function _exportSubjects (jats, doc) {
  // NOTE: subjects are used to populate <article-categories>
  // - subjects are organized flat, not hierarchically
  // - `subject.category` is mapped to subject[content-type]
  // - subjects are grouped into <subj-groups> using their language property
  // group subjects by language
  // TODO: this should come from the article node
  let $$ = jats.$$
  let subjects = doc.resolve(['metadata', 'subjects'])
  // TODO: remove or rework translations of subjects
  let byLang = subjects.reduce((byLang, subject) => {
    let lang = subject.language
    if (!byLang[lang]) {
      byLang[lang] = []
    }
    byLang[lang].push(subject)
    return byLang
  }, {})
  let articleCategories = $$('article-categories')
  forEach(byLang, (subjects, lang) => {
    let groupEl = $$('subj-group')
    if (lang !== 'undefined') {
      groupEl.attr('xml:lang', lang)
    }
    groupEl.append(
      subjects.map(subject => {
        return $$('subject').attr({ 'content-type': subject.category }).text(subject.name)
      })
    )
    articleCategories.append(groupEl)
  })
  // only return if there have been converted subjects
  if (articleCategories.getChildCount() > 0) {
    return articleCategories
  }
}