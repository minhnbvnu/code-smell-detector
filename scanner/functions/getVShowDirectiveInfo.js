function getVShowDirectiveInfo (node) {
  var dir;
  var tmp;

  while (isDef(node)) {
    if (node.data && node.data.directives) {
      tmp = node.data.directives.find(function (dir) { return dir.name === 'show'; });
      if (tmp) {
        dir = tmp;
      }
    }
    node = node.parent;
  }
  return dir
}