function allBlank(rows,y,xMin,xMax){
    for(var x = xMin; x < xMax; x++){
      if(conflictExists(rows,x,y)){
        return false;
      }
    }
    return true;
  }