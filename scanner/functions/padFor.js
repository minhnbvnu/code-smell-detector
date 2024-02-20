function padFor(s, max) {
  var l = s.length;
  return l < max ? repeating(space, max - l) : nullString;
}