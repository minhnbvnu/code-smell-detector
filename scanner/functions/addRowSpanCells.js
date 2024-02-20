function addRowSpanCells(table){
    table.forEach(function(row,rowIndex){
      row.forEach(function(cell){
        for(var i = 1; i < cell.rowSpan; i++){
          var rowSpanCell = new RowSpanCell(cell);
          rowSpanCell.x = cell.x;
          rowSpanCell.y = cell.y + i;
          rowSpanCell.colSpan = cell.colSpan;
          insertCell(rowSpanCell,table[rowIndex+i]);
        }
      });
    });
  }