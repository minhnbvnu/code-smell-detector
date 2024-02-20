function parseList(stream, pos, separator, parsers) {
  var symbols = [], childAst, length = 0, separators = 0;
  while (true) {
    if (childAst = parseAnyType(stream, pos, parsers)) {
      symbols.push(childAst);
      length += childAst.length;
      pos += childAst.length;

      if (stream[pos].type == separator) {
        length++;
        pos++;
        separators++;
        continue;
      }
    }
    break;
  }

  if (symbols.length && symbols.length != separators + 1) {
    throwError('Malformed list expression');
  }

  return {
    value: symbols,
    length: length
  };
}