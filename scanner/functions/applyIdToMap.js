function applyIdToMap(inst, map, node, nodeInfo) {
    if (nodeInfo.id) {
      map[nodeInfo.id] = node;
    }
  }