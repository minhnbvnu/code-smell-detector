function getLocation(range, index) {
      return { line: offsetLine + range.line, column: offsetColumn + index - range.start, character: index };
    }