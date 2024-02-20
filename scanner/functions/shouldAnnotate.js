function shouldAnnotate(transformsForFile) {
  var t = false;
  transformsForFile.forEach(function(transform) {
    t = t || transform.annotates();
  });
  return t;
}