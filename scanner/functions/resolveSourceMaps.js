function resolveSourceMaps(sourceMapInstance, stackFrame) {
  try {
    var orig = sourceMapInstance.originalPositionFor({
      line: stackFrame.lineNumber,
      column: stackFrame.column,
    });
    if (orig) {
      // remove query string if any
      const queryStringStartIndex = orig.source.indexOf('?');
      stackFrame.file = queryStringStartIndex === -1
        ? orig.source
        : orig.source.substring(0, queryStringStartIndex);
      stackFrame.lineNumber = orig.line;
      stackFrame.column = orig.column;
    }
  } catch (innerEx) {
  }
}