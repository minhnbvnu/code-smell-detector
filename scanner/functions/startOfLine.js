function startOfLine(stream) {
      return stream.sol() || stream.string.match(new RegExp("^\\s*" + escapeRegExp(stream.current())));
    }