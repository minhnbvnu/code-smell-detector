function recursivelyInitializeTree(id, parentID, nodes, dataForRoot) {
  const node = dataForRoot.snapshots.get(id);

  if (node != null) {
    nodes.set(id, {
      id,
      children: node.children,
      displayName: node.displayName,
      hocDisplayNames: node.hocDisplayNames,
      key: node.key,
      parentID,
      treeBaseDuration: dataForRoot.initialTreeBaseDurations.get(id),
      type: node.type
    });
    node.children.forEach(childID => recursivelyInitializeTree(childID, id, nodes, dataForRoot));
  }
}