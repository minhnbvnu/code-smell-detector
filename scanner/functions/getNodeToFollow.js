function getNodeToFollow(nodeId) {
    let candidates = [];
    graph.forEachLinkedNode(nodeId, function(otherNode) {
      candidates.push({
        otherNode,
        degree: getNodeDegree(otherNode.id)
      })
    });
    candidates.sort((b, a) => a.degree - b.degree);
    if (candidates.length === 0) { let nodeCandidates = []
      graph.forEachNode(function(otherNode) {
        if (otherNode.id !== nodeId) nodeCandidates.push(otherNode.id);
      });
      let index = Math.round(random.nextDouble() * (nodeCandidates.length - 1));
      return nodes.get(nodeCandidates[index]);
    }
    return nodes.get(candidates[0].id);
  }