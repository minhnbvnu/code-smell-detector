function insertColorsIntoArray(stops, targetArray, atIndex) {
  var i = 0;
  if ('length' in stops) {
    while (i < stops.length) {
      insertColorIntoArray(stops[i], targetArray, atIndex + i * 4);
      i++;
    }
  } else {
    for (var offset in stops) {
      insertColorIntoArray(stops[offset], targetArray, atIndex + i * 4);
      i++;
    }
  }
  return atIndex + i * 4;
}