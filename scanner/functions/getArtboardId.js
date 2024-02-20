function getArtboardId(ab) {
  var id = 0;
  forEachUsableArtboard(function(ab2, i) {
    if (ab === ab2) id = i;
  });
  return id;
}