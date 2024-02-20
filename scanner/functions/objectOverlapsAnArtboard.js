function objectOverlapsAnArtboard(obj) {
  var hit = false;
  forEachUsableArtboard(function(ab) {
    hit = hit || objectOverlapsArtboard(obj, ab);
  });
  return hit;
}