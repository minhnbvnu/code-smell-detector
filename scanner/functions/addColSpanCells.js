function addColSpanCells(cellRows){
    for(var rowIndex = cellRows.length-1; rowIndex >= 0; rowIndex--) {
      var cellColumns = cellRows[rowIndex];
      for (var columnIndex = 0; columnIndex < cellColumns.length; columnIndex++) {
        var cell = cellColumns[columnIndex];
        for (var k = 1; k < cell.colSpan; k++) {
          var colSpanCell = new ColSpanCell();
          colSpanCell.x = cell.x + k;
          colSpanCell.y = cell.y;
          cellColumns.splice(columnIndex + 1, 0, colSpanCell);
        }
      }
    }
  }