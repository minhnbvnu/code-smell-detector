function _exportKeywords (jats, doc, jatsExporter) {
  const $$ = jats.$$
  // TODO: remove or rework tranlations of keywords
  const keywords = doc.resolve(['metadata', 'keywords'])
  let byLang = keywords.reduce((byLang, keyword) => {
    let lang = keyword.language
    if (!byLang[lang]) {
      byLang[lang] = []
    }
    byLang[lang].push(keyword)
    return byLang
  }, {})
  let keywordGroups = []
  forEach(byLang, (keywords, lang) => {
    let groupEl = $$('kwd-group')
    if (lang !== 'undefined') {
      groupEl.attr('xml:lang', lang)
    }
    groupEl.append(
      keywords.map(keyword => {
        return $$('kwd').attr({ 'content-type': keyword.category }).append(
          jatsExporter.annotatedText([keyword.id, 'name'])
        )
      })
    )
    keywordGroups.push(groupEl)
  })
  return keywordGroups
}