function syncLayouts() {
    graph.forEachNode(function (node) {
      var pos = physicsLayout.getNodePosition(node.id);
      fakeLayout.setDesiredNodePosition(node.id, pos);
    })
  }