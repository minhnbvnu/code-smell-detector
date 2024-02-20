function doctype(stream) {
    if (stream.match(/^(?:doctype) *([^\n]+)?/)) {
        return DOCTYPE;
    }
  }