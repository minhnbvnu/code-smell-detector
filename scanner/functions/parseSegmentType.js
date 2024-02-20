function parseSegmentType(stream, pos) {
  var segmentAst;
  if (stream[pos].type == TOKENS.OPENSEGMENT &&
      (segmentAst = parseAnyType(stream, ++pos))) {
    pos += segmentAst.length
    if (stream[pos].type == TOKENS.CLOSESEGMENT) {
      return createAst(SYMBOLS.SEGMENT, segmentAst, segmentAst.length + 2);
    }
  }
}