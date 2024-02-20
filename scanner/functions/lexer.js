function lexer(str, options) {
  const state = {
    str,
    options,
    position: makeInitialPosition(),
    tokens: [],
  }
  lex(state)
  return state.tokens
}