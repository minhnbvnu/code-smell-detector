function lexComment(state) {
  const { str, position } = state
  const start = copyPosition(position)
  feedPosition(position, str, 4) // "<!--".length
  let contentEnd = str.indexOf('-->', position.index)
  let commentEnd = contentEnd + 3 // "-->".length
  if (contentEnd === -1) {
    contentEnd = commentEnd = str.length
  }

  const content = str.slice(position.index, contentEnd)
  jumpPosition(position, str, commentEnd)
  state.tokens.push({
    type: 'comment',
    content,
    position: {
      start,
      end: copyPosition(position),
    },
  })
}