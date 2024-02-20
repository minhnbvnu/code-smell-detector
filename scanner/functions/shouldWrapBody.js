function shouldWrapBody(transformsForFile) {
  var t = false;
  transformsForFile.forEach(function(transform) {
    t = t || transform.wrapsBody();
  });
  return t;
}