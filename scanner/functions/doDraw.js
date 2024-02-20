function doDraw(row,lineNum,result){
  var line = [];
  row.forEach(function(cell){
    line.push(cell.draw(lineNum));
  });
  var str = line.join('');
  if(str.length) result.push(str);
}