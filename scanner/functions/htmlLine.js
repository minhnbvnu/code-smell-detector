function htmlLine(stream, state) {
      if (stream.match(/^\\$/)) {
        return "lineContinuation";
      }
      return html(stream, state);
    }