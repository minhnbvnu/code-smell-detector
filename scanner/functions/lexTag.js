function lexTag(state) {
  const { str, position } = state
  {
    const secondChar = str.charAt(position.index + 1)
    const close = secondChar === '/'
    const start = copyPosition(position)
    feedPosition(position, str, close ? 2 : 1)
    state.tokens.push({ type: 'tag-start', close, position: { start } })
  }
  const tagName = lexTagName(state)
  lexTagAttributes(state)
  {
    const firstChar = str.charAt(position.index)
    const close = firstChar === '/'
    feedPosition(position, str, close ? 2 : 1)
    const end = copyPosition(position)
    state.tokens.push({ type: 'tag-end', close, position: { end } })
  }
  return tagName
}