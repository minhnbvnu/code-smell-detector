function getElementById(id, nodes, recurse) {
  if (recurse === void 0) {
    recurse = true;
  }
  if (!Array.isArray(nodes)) nodes = [nodes];
  return (0, querying_1.findOne)(getAttribCheck("id", id), nodes, recurse);
}