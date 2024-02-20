function runOverlapsRemoval() {
    // TODO: Async?
    let rectangles = getRectangles();
    removeOverlaps(rectangles);
    removeOverlaps(rectangles);
    removeOverlaps(rectangles);
    rectangles.forEach((rect, nodeId) => {
      physicsLayout.setNodePosition(nodeId, rect.left - rect.dx, rect.top - rect.dy);
    });
  }