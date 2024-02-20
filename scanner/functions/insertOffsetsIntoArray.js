function insertOffsetsIntoArray(stops, targetArray, atIndex, multi, reverse) {
  var offsetNumber;
  var i = 0;
  if ('length' in stops) {
    while (i < stops.length) {
      offsetNumber = i / (stops.length - 1) * multi;
      targetArray[atIndex + i] = reverse ? 1 - offsetNumber : offsetNumber;
      i++;
    }
  } else {
    for (var offsetString in stops) {
      offsetNumber = (+offsetString) * multi;
      targetArray[atIndex + i] = reverse ? 1 - offsetNumber : offsetNumber;
      i++;
    }
  }
  return atIndex + i;
}