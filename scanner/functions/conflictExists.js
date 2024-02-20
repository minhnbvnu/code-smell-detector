function conflictExists(rows,x,y){
    var i_max = Math.min(rows.length-1,y);
    var cell = {x:x,y:y};
    for(var i = 0; i <= i_max; i++){
      var row = rows[i];
      for(var j = 0; j < row.length; j++){
        if(cellsConflict(cell,row[j])){
          return true;
        }
      }
    }
    return false;
  }