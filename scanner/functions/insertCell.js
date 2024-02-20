function insertCell(cell,row){
    var x = 0;
    while(x < row.length && (row[x].x < cell.x)) {
      x++;
    }
    row.splice(x,0,cell);
  }