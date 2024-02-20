function catchup(end, state, contentTransformer) {
  if (end < state.g.position) {
    // cannot move backwards
    return;
  }
  var source = state.g.source.substring(state.g.position, end);
  var transformed = updateIndent(source, state);
  if (state.g.sourceMap && transformed) {
    // record where we are
    state.g.sourceMap.addMapping({
      generated: { line: state.g.bufferLine, column: state.g.bufferColumn },
      original: { line: state.g.sourceLine, column: state.g.sourceColumn },
      source: state.g.sourceMapFilename
    });

    // record line breaks in transformed source
    var sourceLines = source.split('\n');
    var transformedLines = transformed.split('\n');
    // Add line break mappings between last known mapping and the end of the
    // added piece. So for the code piece
    //  (foo, bar);
    // > var x = 2;
    // > var b = 3;
    //   var c =
    // only add lines marked with ">": 2, 3.
    for (var i = 1; i < sourceLines.length - 1; i++) {
      state.g.sourceMap.addMapping({
        generated: { line: state.g.bufferLine, column: 0 },
        original: { line: state.g.sourceLine, column: 0 },
        source: state.g.sourceMapFilename
      });
      state.g.sourceLine++;
      state.g.bufferLine++;
    }
    // offset for the last piece
    if (sourceLines.length > 1) {
      state.g.sourceLine++;
      state.g.bufferLine++;
      state.g.sourceColumn = 0;
      state.g.bufferColumn = 0;
    }
    state.g.sourceColumn += sourceLines[sourceLines.length - 1].length;
    state.g.bufferColumn +=
      transformedLines[transformedLines.length - 1].length;
  }
  state.g.buffer +=
    contentTransformer ? contentTransformer(transformed) : transformed;
  state.g.position = end;
}