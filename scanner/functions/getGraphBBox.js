function getGraphBBox() {
    var graphBoundingBox = new BBox();

    graph.forEachLink(function(link) {
      var currentPos = nodes.get(link.fromId);
      currentPos.scaled = false;
      graphBoundingBox.addPoint(currentPos.x, currentPos.y);
      var otherPos = nodes.get(link.toId);
      otherPos.scaled = false;
      graphBoundingBox.addPoint(otherPos.x, otherPos.y);
    });
    return graphBoundingBox;
  }