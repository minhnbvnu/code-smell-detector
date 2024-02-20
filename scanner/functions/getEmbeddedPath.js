function getEmbeddedPath(parent, path) {
  var elements = path.split('/');
  for ( var i in elements) {
    var element = elements[i];
    var embedded = parent._embedded;
    if (!embedded) {
      return undefined;
    }
    var child = embedded[element];
    if (!child) {
      return undefined;
    }
    parent = child;
  }
  return parent;
}