function unshiftContainer(listKey, nodes) {
  this._assertUnremoved();

  nodes = this._verifyNodeList(nodes);

  const path = _index.default.get({
    parentPath: this,
    parent: this.node,
    container: this.node[listKey],
    listKey,
    key: 0
  });

  return path._containerInsertBefore(nodes);
}