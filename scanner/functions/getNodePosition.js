function getNodePosition(nodeId) {
    let pos = nodes.get(nodeId)
    if (!pos) {
      pos = addNode(nodeId);
    } 
    return pos.position;
  }