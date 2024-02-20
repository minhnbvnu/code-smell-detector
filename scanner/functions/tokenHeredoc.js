function tokenHeredoc(delim) {
    return function(stream, state) {
      if (stream.sol() && stream.string == delim) state.tokens.shift()
      stream.skipToEnd()
      return "string-2"
    }
  }