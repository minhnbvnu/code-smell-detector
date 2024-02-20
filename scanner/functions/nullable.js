function nullable(fn) {
  return function(stream, pos) {
    var nullable = stream[pos].type == '?' && ++pos;
    var ast = fn(stream, pos);
    if (ast && nullable) {
      ast.nullable = true;
      ast.length++;
    }
    return ast;
  };
}