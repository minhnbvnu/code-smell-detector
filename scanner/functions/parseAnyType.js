function parseAnyType(stream, pos, parsers) {
  if (!parsers) parsers =
    PARSERS.SEGMENT | PARSERS.SIMPLE | PARSERS.UNION | PARSERS.GENERIC
    | PARSERS.FUNCTION;

  var ast =
    (parsers & PARSERS.UNION && parseUnionType(stream, pos)) ||
    (parsers & PARSERS.SEGMENT && parseSegmentType(stream, pos)) ||
    (parsers & PARSERS.GENERIC && parseGenericType(stream, pos)) ||
    (parsers & PARSERS.FUNCTION && parseFunctionType(stream, pos)) ||
    (parsers & PARSERS.SIMPLE && parseSimpleType(stream, pos));
  if (!ast) {
    throwError('Could not parse ' + stream[pos].type);
  }
  return ast;
}