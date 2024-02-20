function fillInTable(table){
    var h_max = maxHeight(table);
    var w_max = maxWidth(table);
    for(var y = 0; y < h_max; y++){
      for(var x = 0; x < w_max; x++){
        if(!conflictExists(table,x,y)){
          var opts = {x:x,y:y,colSpan:1,rowSpan:1};
          x++;
          while(x < w_max && !conflictExists(table,x,y)){
            opts.colSpan++;
            x++;
          }
          var y2 = y + 1;
          while(y2 < h_max && allBlank(table,y2,opts.x,opts.x+opts.colSpan)){
            opts.rowSpan++;
            y2++;
          }

          var cell = new Cell(opts);
          cell.x = opts.x;
          cell.y = opts.y;
          insertCell(cell,table[y]);
        }
      }
    }
  }