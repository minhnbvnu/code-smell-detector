function expressionAllowed(stream, state, backUp) {
  return /^(?:operator|sof|keyword c|case|new|export|default|[\[{}\(,;:]|=>)$/.test(state.lastType) ||
    (state.lastType == "quasi" && /\{\s*$/.test(stream.string.slice(0, stream.pos - (backUp || 0))))
}