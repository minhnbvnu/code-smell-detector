function pathJoin(paths) {
  var slashes = new RegExp('/{1,}', 'g');
  return paths.join('/').replace(slashes, '/');
}