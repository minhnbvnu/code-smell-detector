function getLinkScore(link) {
    let fromNode = graph.getNode(link.fromId).data;
    let toNode = graph.getNode(link.toId).data;
    const depth = (fromNode.depth + toNode.depth)/2;
    return (maxDepth - depth)/maxDepth;
  }