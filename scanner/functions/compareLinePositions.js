function compareLinePositions(location, mappings, index) {
  const startIndex = index;
  const start = mappings[startIndex];

  if (start == null) {
    throw new Error(`Unexpected line missing in HookMap at index ${index}.`);
  }

  const startLine = getLineNumberFromLine(start);
  let endLine;
  let endIndex = index + 1;
  const end = mappings[endIndex];

  if (end != null) {
    endLine = getLineNumberFromLine(end);
  } else {
    endIndex = startIndex;
    endLine = startLine;
  } // When the line matches exactly, return the matching index


  if (startLine === location.line) {
    return {
      index: startIndex,
      direction: 0
    };
  }

  if (endLine === location.line) {
    return {
      index: endIndex,
      direction: 0
    };
  } // If we're at the end of the mappings, and the target line is greater
  // than the current line, then this final line must cover the
  // target location, so we return it.


  if (location.line > endLine && end == null) {
    return {
      index: endIndex,
      direction: 0
    };
  } // If the location is within the current line and the adjacent one,
  // we know that the target location must be covered by the current line.


  if (startLine < location.line && location.line < endLine) {
    return {
      index: startIndex,
      direction: 0
    };
  } // Otherwise, return the next direction in the search.


  return {
    index: null,
    direction: location.line - startLine
  };
}