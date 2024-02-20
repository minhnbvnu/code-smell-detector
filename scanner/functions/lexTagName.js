function lexTagName(state) {
  const { str, position } = state
  const len = str.length
  let start = position.index
  while (start < len) {
    const char = str.charAt(start)
    const isTagChar = !(isWhitespaceChar(char) || char === '/' || char === '>')
    if (isTagChar) break
    start++
  }

  let end = start + 1
  while (end < len) {
    const char = str.charAt(end)
    const isTagChar = !(isWhitespaceChar(char) || char === '/' || char === '>')
    if (!isTagChar) break
    end++
  }

  jumpPosition(position, str, end)
  const tagName = str.slice(start, end)
  state.tokens.push({
    type: 'tag',
    content: tagName,
  })
  return tagName
}