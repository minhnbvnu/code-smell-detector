function PropertyBinding(rootNode, path, parsedPath) {

  this.path = path;
  this.parsedPath = parsedPath || PropertyBinding.parseTrackName(path);

  this.node = PropertyBinding.findNode(rootNode, this.parsedPath.nodeName) || rootNode;

  this.rootNode = rootNode;

}