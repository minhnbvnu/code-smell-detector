function getIndentation (options) {
  if (options && options.indentType && options.indentCount) {
    let charIndentation = options.indentType === 'Tab' ? '\t' : ' ';
    return charIndentation.repeat(options.indentCount);
  }
  return '  ';
}