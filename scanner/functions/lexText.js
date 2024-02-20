function lexText(state) {
  const type = 'text'
  const { str, position } = state
  let textEnd = findTextEnd(str, position.index)
  if (textEnd === position.index) return
  if (textEnd === -1) {
    textEnd = str.length
  }

  const start = copyPosition(position)
  const content = str.slice(position.index, textEnd)
  jumpPosition(position, str, textEnd)
  const end = copyPosition(position)
  state.tokens.push({ type, content, position: { start, end } })
}