function getPositionFromColumn(lines, column) {
  let currentLength = 0;
  let currentLine = 0;
  let previousLength = 0;

  while (column >= currentLength) {
    previousLength = currentLength;
    currentLength += lines[currentLine].length + 1;
    currentLine++;
  }

  return [currentLine - 1, column - previousLength];
}