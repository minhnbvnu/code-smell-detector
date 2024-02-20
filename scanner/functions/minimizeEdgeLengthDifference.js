function minimizeEdgeLengthDifference() {
    var desLength = 0;
    graph.forEachLink(function(link) {
      var currentPos = nodes.get(link.fromId);
      var otherPos = nodes.get(link.toId);
      var dx = otherPos.x - currentPos.x;
      var dy = otherPos.y - currentPos.y;
      var l = Math.sqrt(dx * dx + dy * dy);
      if (l > desLength) desLength = l;
    });

    edgeLength = desLength;

    graph.forEachLink(function(link) {
      var formPos = nodes.get(link.fromId);
      var toPos = nodes.get(link.toId);
      var dx = toPos.x - formPos.x;
      var dy = toPos.y - formPos.y;
      var l = Math.sqrt(dx * dx + dy * dy);
      while (l < 1e-10) {
        dx = (random.nextDouble() - 0.5);
        dx = (random.nextDouble() - 0.5);
        l = Math.sqrt(dx * dx + dy * dy);
      }

      // ddx = k2 * (desLength - l) * dx/l;
      // ddy = k2 * (desLength - l) * dy/l;
      var tR = 1
      toPos.incX += toPos.x + k2 * (desLength - l) * dx/l * tR;
      toPos.incY += toPos.y + k2 * (desLength - l) * dy/l * tR;
      toPos.incLength += 1;

      // same drill with `tF`.
      var tF = 1;
      formPos.incX += formPos.x - k2 * (desLength- l) * dx/l * tF;
      formPos.incY += formPos.y - k2 * (desLength- l) * dy/l  * tF;
      formPos.incLength += 1;
    });

    processIncomingMessages();
  }