function pushContainer(listKey, nodes) {
  this._assertUnremoved();

  nodes = this._verifyNodeList(nodes);
  const container = this.node[listKey];

  const path = _index.default.get({
    parentPath: this,
    parent: this.node,
    container: container,
    listKey,
    key: container.length
  });

  return path.replaceWithMultiple(nodes);
}