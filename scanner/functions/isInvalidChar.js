function isInvalidChar(str) {
  var ch = toStr(str);
  return ch === '\\'
    || ch === '['
    || ch === ']'
    || ch === '^'
    || ch === '('
    || ch === ')'
    || ch === '`';
}