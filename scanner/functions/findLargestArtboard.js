function findLargestArtboard() {
  var largestId = -1;
  var largestArea = 0;
  forEachUsableArtboard(function(ab, i) {
    var info = convertAiBounds(ab.artboardRect);
    var area = info.width * info.height;
    if (area > largestArea) {
      largestId = i;
      largestArea = area;
    }
  });
  return largestId;
}