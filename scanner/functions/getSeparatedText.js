function getSeparatedText (rootEl, selector) {
  let el = rootEl.findAll(selector)
  if (el) {
    return el.map(m => { return m.textContent }).join('; ')
  } else {
    return ''
  }
}