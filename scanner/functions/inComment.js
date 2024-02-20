function inComment (stream, state) {
      if (stream.match(/^.*?#\}/)) state.tokenize = tokenBase
      else stream.skipToEnd()
      return "comment";
    }