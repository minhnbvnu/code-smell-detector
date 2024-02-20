function getSibling(key) {
  return _index.default.get({
    parentPath: this.parentPath,
    parent: this.parent,
    container: this.container,
    listKey: this.listKey,
    key: key
  });
}