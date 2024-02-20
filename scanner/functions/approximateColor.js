function approximateColor(color, palette) {
  function colorDistance(a, b) {
    return Math.sqrt(
      Math.pow( ((a[0]) - (b[0])), 2 ) +
      Math.pow( ((a[1]) - (b[1])), 2 ) +
      Math.pow( ((a[2]) - (b[2])), 2 )
    );
  };

  function findIndex(fun, arg, list, min) {
    if (list.length == 2) {
      if (fun(arg,min) <= fun(arg,list[1])) {
        return min;
      } else {
        return list[1];
      }
    } else {
      var tl = list.slice(1);
      if (fun(arg,min) <= fun(arg,list[1])) {
        min = min;
      } else {
        min = list[1];
      }
      return findIndex(fun,arg,tl,min);
    }
  };

  var foundColor = findIndex(colorDistance, color, palette, palette[0]);

  return foundColor;
}