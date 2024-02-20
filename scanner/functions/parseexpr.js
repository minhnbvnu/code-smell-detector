function parseexpr(tokens) {
      return full_parse_expr(state, tokens), state.shift()
    }