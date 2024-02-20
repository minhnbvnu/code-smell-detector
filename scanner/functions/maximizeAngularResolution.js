function maximizeAngularResolution() {
    graph.forEachNode(function(node) {
      var currentPos = nodes.get(node.id);
      var neighbors = [];
      graph.forEachLinkedNode(node.id, function(other) {
        var otherPos = nodes.get(other.id);
        var dx = otherPos.x - currentPos.x;
        var dy = otherPos.y - currentPos.y;
        var angle = Math.atan2(dy, dx) + Math.PI;
        neighbors.push({
          pos: otherPos,
          angle,
          strength: 1 
        });
      });
      if (neighbors.length < 2) return;
      // if (Math.random() < 0.4) return;
      // if (Math.random() < 0.001) node.ascending = undefined;
      if (node.ascending === undefined) {
        node.ascending = Math.random() < 0.5;
      }
      // node.ascending; //
      var ascending = node.ascending; // Math.random() > 0.50;
      neighbors.sort((a, b) => a.angle - b.angle);

      var desiredAngle = 2 * Math.PI / neighbors.length;
      var direction = ascending ? 1 : -1;

      var idx = 0;
      var startFrom = Math.round(Math.random() * (neighbors.length - 1));
      while (idx < neighbors.length) {
        var i = (startFrom + idx) % neighbors.length;
        idx += 1;
        var curr = neighbors[i];
        var next, curAngle;
        var nextIndex = i + direction;
        if (nextIndex === neighbors.length) nextIndex = 0;
        if (nextIndex < 0) nextIndex = neighbors.length - 1;

        next = neighbors[nextIndex];
        curAngle = (next.angle - curr.angle) * direction;

        if (curAngle < 0) curAngle += 2 * Math.PI;

        if (curAngle < desiredAngle) continue;

        var otherPos = curr.pos;
        var newAngle = curr.strength * k3 * (curAngle - desiredAngle) * direction;
        var rPoint = rotate(currentPos, otherPos, newAngle);
        otherPos.incX += rPoint.x;
        otherPos.incY += rPoint.y;
        otherPos.incLength += 1;
      }
    });

    processIncomingMessages();
  }