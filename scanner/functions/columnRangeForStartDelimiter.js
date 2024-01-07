function columnRangeForStartDelimiter(line, delimiter) {
  const startColumn = line.search(NON_WHITESPACE_REGEXP);
  if (startColumn === -1) return null;
  if (!line.startsWith(delimiter, startColumn)) return null;

  let endColumn = startColumn + delimiter.length;
  if (line[endColumn] === ' ') endColumn++;
  return [startColumn, endColumn];
}