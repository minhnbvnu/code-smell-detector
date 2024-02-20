function inBlockComment (stream, state) {
      if (stream.match(/\{%\s*endcomment\s*%\}/, false)) {
        state.tokenize = inTag;
        stream.match("{%");
        return "tag";
      } else {
        stream.next();
        return "comment";
      }
    }