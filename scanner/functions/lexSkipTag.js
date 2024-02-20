function lexSkipTag(tagName, state) {
  const { str, position, tokens } = state
  const safeTagName = tagName.toLowerCase()
  const len = str.length
  let index = position.index
  while (index < len) {
    const nextTag = str.indexOf('</', index)
    if (nextTag === -1) {
      lexText(state)
      break
    }

    const tagStartPosition = copyPosition(position)
    jumpPosition(tagStartPosition, str, nextTag)
    const tagState = { str, position: tagStartPosition, tokens: [] }
    const name = lexTag(tagState)
    if (safeTagName !== name.toLowerCase()) {
      index = tagState.position.index
      continue
    }

    if (nextTag !== position.index) {
      const textStart = copyPosition(position)
      jumpPosition(position, str, nextTag)
      tokens.push({
        type: 'text',
        content: str.slice(textStart.index, nextTag),
        position: {
          start: textStart,
          end: copyPosition(position),
        },
      })
    }

    push.apply(tokens, tagState.tokens)
    jumpPosition(position, str, tagState.position.index)
    break
  }
}