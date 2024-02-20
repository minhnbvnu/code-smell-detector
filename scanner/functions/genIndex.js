function genIndex(path, content = '', router, depth) {
  const tokens = window.marked.lexer(content)
  const slugify = window.Docsify.slugify
  const index = {}
  let slug

  tokens.forEach(token => {
    if (token.type === 'heading' && token.depth <= depth) {
      slug = router.toURL(path, {id: slugify(token.text)})
      index[slug] = {slug, title: token.text, body: ''}
    } else {
      if (!slug) {
        return
      }
      if (!index[slug]) {
        index[slug] = {slug, title: '', body: ''}
      } else if (index[slug].body) {
        index[slug].body += '\n' + (token.text || '')
      } else {
        index[slug].body = token.text
      }
    }
  })
  slugify.clear()
  return index
}