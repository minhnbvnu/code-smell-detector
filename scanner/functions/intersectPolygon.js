function intersectPolygon(node, polygon, point) {
  var x1 = node.x;
  var y1 = node.y;
  var x2 = point.x;
  var y2 = point.y;

  var intersections = [];
  var points = polygon.points;

  var minx = 100000, miny = 100000;
  for (var j = 0; j < points.numberOfItems; j++) {
    var p = points.getItem(j);
    minx = Math.min(minx, p.x);
    miny = Math.min(miny, p.y);
  }

  var left = x1 - node.width / 2 - minx;
  var top =  y1 - node.height / 2 - miny;

  for (var i = 0; i < points.numberOfItems; i++) {
    var p1 = points.getItem(i);
    var p2 = points.getItem(i < points.numberOfItems - 1 ? i + 1 : 0);
    intersectLine(x1, y1, x2, y2, left + p1.x, top + p1.y, left + p2.x, top + p2.y, intersections);
  }

  if (intersections.length === 1) {
    return {x: intersections[0][0], y: intersections[0][1]};
  }

  if (intersections.length > 1) {
    // More intersections, find the one nearest to edge end point
    intersections.sort(function(p, q) {
      var pdx = p[0] - point.x,
         pdy = p[1] - point.y,
         distp = Math.sqrt(pdx * pdx + pdy * pdy),

         qdx = q[0] - point.x,
         qdy = q[1] - point.y,
         distq = Math.sqrt(qdx * qdx + qdy * qdy);

      return (distp < distq) ? -1 : (distp === distq ? 0 : 1);
    });
    return {x: intersections[0][0], y: intersections[0][1]};
  } else {
    console.log('NO INTERSECTION FOUND, RETURN NODE CENTER', node);
    return node;
  }
}