function compareColumnPositions(location, line, index) {
  const startIndex = index;
  const start = line[index];

  if (start == null) {
    throw new Error(`Unexpected mapping missing in HookMap line at index ${index}.`);
  }

  const startColumn = getColumnNumberFromEntry(start);
  let endColumn;
  let endIndex = index + 1;
  const end = line[endIndex];

  if (end != null) {
    endColumn = getColumnNumberFromEntry(end);
  } else {
    endIndex = startIndex;
    endColumn = startColumn;
  } // When the column matches exactly, return the matching index


  if (startColumn === location.column) {
    return {
      index: startIndex,
      direction: 0
    };
  }

  if (endColumn === location.column) {
    return {
      index: endIndex,
      direction: 0
    };
  } // If we're at the end of the entries for this line, and the target
  // column is greater than the current column, then this final entry
  // must cover the target location, so we return it.


  if (location.column > endColumn && end == null) {
    return {
      index: endIndex,
      direction: 0
    };
  } // If the location is within the current column and the adjacent one,
  // we know that the target location must be covered by the current entry.


  if (startColumn < location.column && location.column < endColumn) {
    return {
      index: startIndex,
      direction: 0
    };
  } // Otherwise, return the next direction in the search.


  return {
    index: null,
    direction: location.column - startColumn
  };
}