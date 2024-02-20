function pathSplit(path) {
  var parts = path.split('/');
  var filename = parts.pop();
  return [parts.join('/'), filename];
}