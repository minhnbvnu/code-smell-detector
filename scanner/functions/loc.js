function loc(startLine, startColumn, endLine, endColumn) {
  return {
    start: pos(startLine, startColumn),
    end: pos(endLine, endColumn)
  };
}