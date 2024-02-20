function endOfLine(stream) {
      return stream.eol() || stream.match(/^\s*$/, false);
    }