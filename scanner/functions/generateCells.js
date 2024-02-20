function generateCells(rows){
    return rows.map(function(row){
      if(kindOf(row) !== 'array'){
        var key = Object.keys(row)[0];
        row = row[key];
        if(kindOf(row) === 'array'){
          row = row.slice();
          row.unshift(key);
        }
        else {
          row = [key,row];
        }
      }
      return row.map(function(cell){
        return new Cell(cell);
      });
    });
  }