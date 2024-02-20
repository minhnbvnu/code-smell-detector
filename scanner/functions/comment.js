function comment(stream, state) {
    if (stream.match(/^ *\/\/(-)?([^\n]*)/)) {
      state.indentOf = stream.indentation();
      state.indentToken = 'comment';
      return 'comment';
    }
  }