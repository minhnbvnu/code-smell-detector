function updatePositions() {
    nodes.forEach((ui, nodeId) => {
      let pos = getNodePosition(nodeId)
      ui.attr('transform', `translate(${pos.x}, ${pos.y})`);
    });
  }