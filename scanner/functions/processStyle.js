function processStyle (style) {
  if (style.lang === 'css') {
    return processCss(style)
  } else {
    throw new Error(`Unknown style language '${style.lang}'`)
  }
}