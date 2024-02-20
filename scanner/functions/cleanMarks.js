function cleanMarks(node) {
  node[isClean] = false;
  if (node.nodes) node.nodes.forEach(function (i) {
    return cleanMarks(i);
  });
  return node;
}