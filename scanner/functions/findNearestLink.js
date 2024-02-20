function findNearestLink(x, y) {
    const neighborIds = pointIndex.neighbors(x, y, 1);
    let pointId = neighborIds[0];
    if (pointId === undefined) return;
    let point = points[pointId];
    if (distance({x,y}, point) < maxDistance) return point.link;
  }