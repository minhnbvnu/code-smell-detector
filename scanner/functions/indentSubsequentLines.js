function indentSubsequentLines(str, level) {
  return str.replace(/\n/g, `\n${new Array(level + 1).join(' ')}`);
}