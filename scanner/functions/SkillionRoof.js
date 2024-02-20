function SkillionRoof(triangles, properties, polygon, dim, roofColor, wallColor) {
    // roof direction required
    if (properties.roofDirection === undefined) {
      return FlatRoof(triangles, properties, polygon, dim, roofColor);
    }

    var
      rad = properties.roofDirection / 180 * Math.PI,
      closestPoint, farthestPoint,
      minY = Infinity, maxY = -Infinity;

    polygon[0].forEach(function(point) {
      var y = point[1]*Math.cos(-rad) + point[0]*Math.sin(-rad);
      if (y < minY) {
        minY = y;
        closestPoint = point;
      }
      if (y > maxY) {
        maxY = y;
        farthestPoint = point;
      }
    });

    var
      outerPolygon = polygon[0],
      roofDirection = [Math.cos(rad), Math.sin(rad)],
      ridge = [closestPoint, [closestPoint[0]+roofDirection[0], closestPoint[1]+roofDirection[1]]],
      maxDistance = getDistanceToLine(farthestPoint, ridge);

    // modify vertical position of all points
    polygon.forEach(function(ring) {
      ring.forEach(function(point) {
        var distance = getDistanceToLine(point, ridge);
        point[2] = (distance/maxDistance)*dim.roofHeight;
      });
    });

    // create roof face
    split.polygon(triangles, [outerPolygon], dim.roofZ, roofColor);

    // create extra wall faces
    polygon.forEach(function(ring) {
      for (var i = 0; i < ring.length - 1; i++) {
        // skip degenerate quads - could even skip degenerate triangles
        if (ring[i][2] === 0 && ring[i + 1][2] === 0) {
          continue;
        }
        split.quad(
          triangles,
          [ring[i][0], ring[i][1], dim.roofZ + ring[i][2]],
          [ring[i][0], ring[i][1], dim.roofZ],
          [ring[i + 1][0], ring[i + 1][1], dim.roofZ],
          [ring[i + 1][0], ring[i + 1][1], dim.roofZ + ring[i + 1][2]],
          wallColor
        );
      }
    });
  }