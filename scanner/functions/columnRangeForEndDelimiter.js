function columnRangeForEndDelimiter(line, delimiter) {
  let startColumn = line.lastIndexOf(delimiter);
  if (startColumn === -1) return null;

  const endColumn = startColumn + delimiter.length;
  if (NON_WHITESPACE_REGEXP.test(line.slice(endColumn))) return null;
  if (line[startColumn - 1] === ' ') startColumn--;
  return [startColumn, endColumn];
}