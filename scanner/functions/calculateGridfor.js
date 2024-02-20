function calculateGridfor(colCount, tiles) {
  let curCol = 0;
  let curRow = 0;
  let spaceTracker = newSpaceTracker();

  return {
    positions: tiles.map(function(tile, i) {
      return reserveSpace(tile, i);
    }),
    rowCount: curRow + Math.max(...spaceTracker)
  };

  function reserveSpace(tile, i) {
    let colspan = tile.get('currentColspan');
    let rowspan = tile.get('currentRowspan');
    if (colspan > colCount) {
      throw new Error(`md-grid-list: Tile at position ${i} has a colspan (${colspan}) that exceeds the column count (${colCount})`);
    }

    let start = 0;
    let end = 0;

    // TODO(shyndman): This loop isn't strictly necessary if you can
    // determine the minimum number of rows before a space opens up. To do
    // this, recognize that you've iterated across an entire row looking for
    // space, and if so fast-forward by the minimum rowSpan count. Repeat
    // until the required space opens up.
    while (end - start < colspan) {
      if (curCol >= colCount) {
        nextRow();
        continue;
      }

      start = spaceTracker.indexOf(0, curCol);
      if (start === -1 || (end = findEnd(start + 1)) === -1) {
        start = end = 0;
        nextRow();
        continue;
      }

      curCol = end + 1;
    }

    adjustRow(start, colspan, rowspan);
    curCol = start + colspan;

    return {
      col: start,
      row: curRow
    };
  }

  function nextRow() {
    curCol = 0;
    curRow++;
    adjustRow(0, colCount, -1); // Decrement row spans by one
  }

  function adjustRow(from, cols, by) {
    for (let i = from; i < from + cols; i++) {
      spaceTracker[i] = Math.max(spaceTracker[i] + by, 0);
    }
  }

  function findEnd(start) {
    let i;
    for (i = start; i < spaceTracker.length; i++) {
      if (spaceTracker[i] !== 0) {
        return i;
      }
    }

    if (i === spaceTracker.length) {
      return i;
    }
  }

  function newSpaceTracker() {
    let tracker = [];
    for (let i = 0; i < colCount; i++) {
      tracker.push(0);
    }
    return tracker;
  }
}