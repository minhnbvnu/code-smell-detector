function createVirtualTable() {
    var rows = domTable.rows;

    for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      var cells = rows[rowIndex].cells;

      for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) {
        addCellInfoToVirtual(rows[rowIndex], cells[cellIndex]);
      }
    }
  }