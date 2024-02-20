function insertColorStopsIntoArray(stops, targetArray, atIndex) {
  var lastIndex = insertColorsIntoArray(stops, targetArray, atIndex);
  insertOffsetsIntoArray(stops, targetArray, lastIndex, 1, false);
}