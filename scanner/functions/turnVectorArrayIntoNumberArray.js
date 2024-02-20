function turnVectorArrayIntoNumberArray(arr){
  return flatten(arr.map(function(item){
    return [item.x, item.y, item.z];
  }));
}