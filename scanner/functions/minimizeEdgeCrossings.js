function minimizeEdgeCrossings() {
    graph.forEachLink(function(link) {
      var currentPos = nodes.get(link.fromId);
      var otherPos = nodes.get(link.toId);
      var dx = currentPos.x - otherPos.x;
      var dy = currentPos.y - otherPos.y;
      otherPos.incX += otherPos.x + k1 * dx;
      otherPos.incY += otherPos.y + k1 * dy;
      otherPos.incLength += 1;

      currentPos.incX += currentPos.x - k1 * dx;
      currentPos.incY += currentPos.y - k1 * dy;
      currentPos.incLength += 1;
    });

    processIncomingMessages();
  }