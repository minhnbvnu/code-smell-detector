function getAnnotatedText (importer, rootEl, selector, path) {
  let el = rootEl.find(selector)
  if (el) {
    return importer.annotatedText(el, path)
  } else {
    return ''
  }
}