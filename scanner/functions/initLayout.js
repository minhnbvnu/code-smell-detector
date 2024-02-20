function initLayout() {
    graph.forEachNode(function(node) {
      addNode(node.id);
    })
  }