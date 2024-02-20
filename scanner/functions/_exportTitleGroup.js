function _exportTitleGroup (jats, doc, jatsExporter) {
  let $$ = jats.$$
  // ATTENTION: ATM only title and subtitle is supported
  // JATS supports more titles beyond this (e.g. for special purposes)
  const TITLE_PATH = ['article', 'title']
  const SUBTITLE_PATH = ['article', 'subTitle']
  let titleGroupEl = $$('title-group')
  let articleTitle = $$('article-title')
  _exportAnnotatedText(jatsExporter, TITLE_PATH, articleTitle)
  titleGroupEl.append(articleTitle)

  // Export subtitle if it's not empty
  if (doc.get(SUBTITLE_PATH)) {
    let articleSubTitle = $$('subtitle')
    _exportAnnotatedText(jatsExporter, SUBTITLE_PATH, articleSubTitle)
    titleGroupEl.append(articleSubTitle)
  }

  return titleGroupEl
}