function getAllNodes(object) {
  let nodes = [];

  if (object._dn) {
    nodes.push(object._dn);
  } else if (object.children) {
    object.children.map(child => {
      nodes = nodes.concat(getAllNodes(child));
    });
  }

  return nodes;
}