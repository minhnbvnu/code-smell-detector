function getDistance( a, b ) {
  var dx = b.x - a.x;
  var dy = b.y - a.y;
  return Math.sqrt( dx * dx + dy * dy );
}