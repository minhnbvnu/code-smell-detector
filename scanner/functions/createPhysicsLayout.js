function createPhysicsLayout() {
    return createLayout(graph, {
      springLength: 20,
      springCoeff: 0.002,
      gravity: -1.2,
      theta: 0.8,
      dragCoeff: 0.02,
      timeStep: 14,
      nodeMass(nodeId) {
        let links = graph.getLinks(nodeId);
        let mul = links ? links.length : 1;
        let node = graph.getNode(nodeId);
        mul *=  (MAX_DEPTH - node.data.depth) + 1;
        return nodeId.length * mul;
      }
    });
  }