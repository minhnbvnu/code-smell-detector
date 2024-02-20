function findDimension(dimensionTable, startingIndex, span){
  var ret = dimensionTable[startingIndex];
  for(var i = 1; i < span; i++){
    ret += 1 + dimensionTable[startingIndex + i];
  }
  return ret;
}