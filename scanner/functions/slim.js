function slim(stream, state) {
      if (state.startOfLine) {
        return startLine(stream, state);
      }
      return slimTag(stream, state);
    }