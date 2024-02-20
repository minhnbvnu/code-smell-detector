function _renderAuthors ($$, authors, entityDb) {
  let fragments = []
  authors.forEach((refContribId, i) => {
    fragments = fragments.concat(
      entityRenderer($$, refContribId, entityDb, { short: true })
    )
    if (i < authors.length - 1) {
      fragments.push(', ')
    }
  })
  return fragments
}