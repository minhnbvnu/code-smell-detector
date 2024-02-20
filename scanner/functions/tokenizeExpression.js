function tokenizeExpression(expr) {
  return tokenize(expr, {
    boolean: /true|false/,
    number: /-?\d+\.?\d*/,
    string: /(["'])((?:\\.|[^\\])*?)\1/,
    operator: /[!=><][=!]?|\?\?|\|/,
    ws: /\s+/,
    param: /[$a-z_][$\w]*/i,
  }).filter(({ type }) => type !== 'ws');
}