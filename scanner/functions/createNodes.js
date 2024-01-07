function createNodes(root, path) {
  let node = null;

  for (const {
    name,
    index
  } of path) {
    for (let i = 0; i <= index; i++) {
      node = new _xfa_object.XmlObject(root[_xfa_object.$namespaceId], name);

      root[_xfa_object.$appendChild](node);
    }

    root = node;
  }

  return node;
}