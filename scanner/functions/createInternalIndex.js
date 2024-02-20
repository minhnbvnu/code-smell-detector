function createInternalIndex() {
    // The main idea is very simple - slice every single link with a ball of radius
    // `maxDistance`, and then build a spatial index tree.
    let step = maxDistance
    let points = [];

    graph.forEachLink(link => {
      let from = layout.getNodePosition(link.fromId);
      let to = layout.getNodePosition(link.toId)
      let linkDistance = distance(from, to);

      // This is going to be the direction in which we will be adding circles:
      let dx = to.x - from.x; let dy = to.y - from.y;
      dx /= linkDistance; dy /= linkDistance;

      // Start from the link point
      let nextPoint = {
        x: from.x,
        y: from.y,
        link
      };

      // And slice the link into pieces...
      while (distance(nextPoint, from) < linkDistance) {
        points.push(nextPoint);
        nextPoint = {
          x: nextPoint.x + step * dx,
          y: nextPoint.y + step * dy,
          link
        };
      }

      // Don't forget about last point of the link:
      points.push({
        x: to.x,
        y: to.y,
        link
      });
    });

    // Now we have all points, we can build spatial index:
    let pointIndex = new Flatbush(points.length)
    let pointSize = step * 0.4;
    points.forEach(point => {
      pointIndex.add(
        point.x - pointSize, point.y - pointSize, 
        point.x + pointSize, point.y + pointSize
      );
    });
    pointIndex.finish();
    return {pointIndex, points};
  }