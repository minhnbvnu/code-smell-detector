function makeComputeWidths(colSpan,desiredWidth,x,forcedMin){
  return function(vals,table){
    var result = [];
    var spanners = [];
    table.forEach(function(row){
      row.forEach(function(cell){
        if((cell[colSpan] || 1) > 1){
          spanners.push(cell);
        }
        else {
          result[cell[x]] = Math.max(result[cell[x]] || 0, cell[desiredWidth] || 0, forcedMin);
        }
      });
    });

    vals.forEach(function(val,index){
      if(kindOf(val) === 'number'){
        result[index] = val;
      }
    });

    //spanners.forEach(function(cell){
    for(var k = spanners.length - 1; k >=0; k--){
      var cell = spanners[k];
      var span = cell[colSpan];
      var col = cell[x];
      var existingWidth = result[col];
      var editableCols = kindOf(vals[col]) === 'number' ? 0 : 1;
      for(var i = 1; i < span; i ++){
        existingWidth += 1 + result[col + i];
        if(kindOf(vals[col + i]) !== 'number'){
          editableCols++;
        }
      }
      if(cell[desiredWidth] > existingWidth){
        i = 0;
        while(editableCols > 0 && cell[desiredWidth] > existingWidth){
          if(kindOf(vals[col+i]) !== 'number'){
            var dif = Math.round( (cell[desiredWidth] - existingWidth) / editableCols );
            existingWidth += dif;
            result[col + i] += dif;
            editableCols--;
          }
          i++;
        }
      }
    }

    objectAssign(vals,result);
    for(var j = 0; j < vals.length; j++){
      vals[j] = Math.max(forcedMin, vals[j] || 0);
    }
  };
}