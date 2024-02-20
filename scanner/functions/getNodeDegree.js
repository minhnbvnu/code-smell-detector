function getNodeDegree(nodeId) {
    let nodeLinks = graph.getLinks(nodeId)
    return ((nodeLinks && nodeLinks.length) || 0);
  }