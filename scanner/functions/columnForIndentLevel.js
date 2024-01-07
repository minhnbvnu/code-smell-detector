function columnForIndentLevel(line, indentLevel, tabLength) {
  let column = 0;
  let indentLength = 0;
  const goalIndentLength = indentLevel * tabLength;
  while (indentLength < goalIndentLength) {
    const char = line[column];
    if (char === '\t') {
      indentLength += tabLength - (indentLength % tabLength);
    } else if (char === ' ') {
      indentLength++;
    } else {
      break;
    }
    column++;
  }
  return column;
}