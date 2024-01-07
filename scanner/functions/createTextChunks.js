function createTextChunks(acc, line, i) {
  if (i > 0) {
    acc.push('\n', '');
  }
  acc.push(line, '');
  return acc;
}