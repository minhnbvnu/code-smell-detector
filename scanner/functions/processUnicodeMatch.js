function processUnicodeMatch(match) {
  const text = getText(match.lines);

  if (text.length === Buffer.byteLength(text)) {
    // fast codepath for lines that only contain characters of 1 byte length.
    return;
  }

  let remainingBuffer = Buffer.from(text);
  let currentLength = 0;
  let previousPosition = 0;

  function convertPosition(position) {
    const currentBuffer = remainingBuffer.slice(0, position - previousPosition);
    currentLength = currentBuffer.toString().length + currentLength;
    remainingBuffer = remainingBuffer.slice(position);

    previousPosition = position;

    return currentLength;
  }

  // Iterate over all the submatches to find the convert the start and end values
  // (which come as bytes from ripgrep) to character positions.
  // We can do this because submatches come ordered by position.
  for (const submatch of match.submatches) {
    submatch.start = convertPosition(submatch.start);
    submatch.end = convertPosition(submatch.end);
  }
}