function processSubmatch(submatch, lineText, offsetRow) {
  const lineParts = lineText.split('\n');

  const start = getPositionFromColumn(lineParts, submatch.start);
  const end = getPositionFromColumn(lineParts, submatch.end);

  // Make sure that the lineText string only contains lines that are
  // relevant to this submatch. This means getting rid of lines above
  // the start row and below the end row.
  for (let i = start[0]; i > 0; i--) {
    lineParts.shift();
  }
  while (end[0] < lineParts.length - 1) {
    lineParts.pop();
  }

  start[0] += offsetRow;
  end[0] += offsetRow;

  return {
    range: [start, end],
    lineText: cleanResultLine({ text: lineParts.join('\n') })
  };
}