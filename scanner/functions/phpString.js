function phpString(closing, escapes) {
    return function(stream, state) { return phpString_(stream, state, closing, escapes); };
  }