function maxWidth(table) {
    var mw = 0;
    table.forEach(function (row) {
      row.forEach(function (cell) {
        mw = Math.max(mw,cell.x + (cell.colSpan || 1));
      });
    });
    return mw;
  }