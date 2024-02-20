function insertDoubleColorStopsIntoArray(stops, targetArray, atIndex) {
  var lastIndex = insertColorsIntoArray(stops, targetArray, atIndex);
  lastIndex = insertColorsIntoArray(stops, targetArray, lastIndex);
  lastIndex = insertOffsetsIntoArray(stops, targetArray, lastIndex, 0.5, false);
  insertOffsetsIntoArray(stops, targetArray, lastIndex, 0.5, true);
}