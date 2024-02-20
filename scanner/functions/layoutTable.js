function layoutTable(table){
    table.forEach(function(row,rowIndex){
      row.forEach(function(cell,columnIndex){
        cell.y = rowIndex;
        cell.x = columnIndex;
        for(var y = rowIndex; y >= 0; y--){
          var row2 = table[y];
          var xMax = (y === rowIndex) ? columnIndex : row2.length;
          for(var x = 0; x < xMax; x++){
            var cell2 = row2[x];
            while(cellsConflict(cell,cell2)){
              cell.x++;
            }
          }
        }
      });
    });
  }