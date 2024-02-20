function roofWithRidge(triangles, properties, polygon, offset, dim, roofColor, wallColor) {
    offset = 0; // TODO

    // no gabled roofs for polygons with holes, roof direction required
    if (polygon.length > 1 || properties.roofDirection === undefined) {
      return FlatRoof(triangles, properties, polygon, dim, roofColor);
    }

    const ridge = getRidge (properties.roofDirection, dim.center, polygon[0]);
    if (!ridge) {
      return FlatRoof(triangles, properties, polygon, dim, roofColor);
    }

    const ridgeIndex = ridge.index;
    let roofPolygon = ridge.roof;

    if (!offset) {
      const distances = getRidgeDistances(roofPolygon, ridge.index);
      const maxDistance = Math.max(...distances);

      // set z of all vertices
      roofPolygon = roofPolygon.map((point, i) => {
        return [
          point[0],
          point[1],
          (1 - distances[i]/maxDistance)*dim.roofHeight // closer to ridge -> closer to roof height
        ];
      });

      // create roof faces
      let roof = roofPolygon.slice(ridgeIndex[0], ridgeIndex[1] + 1);
      split.polygon(triangles, [roof], dim.roofZ, roofColor);

      roof = roofPolygon.slice(ridgeIndex[1], roofPolygon.length - 1);
      roof = roof.concat(roofPolygon.slice(0, ridgeIndex[0] + 1));
      split.polygon(triangles, [roof], dim.roofZ, roofColor);

      // create extra wall faces
      for (let i = 0; i < roofPolygon.length - 1; i++) {
        // skip degenerate quads - could even skip degenerate triangles
        if (roofPolygon[i][2] === 0 && roofPolygon[i + 1][2] === 0) {
          continue;
        }
        split.quad(
          triangles,
          [roofPolygon[i][0], roofPolygon[i][1], dim.roofZ + roofPolygon[i][2]],
          [roofPolygon[i][0], roofPolygon[i][1], dim.roofZ],
          [roofPolygon[i + 1][0], roofPolygon[i + 1][1], dim.roofZ],
          [roofPolygon[i + 1][0], roofPolygon[i + 1][1], dim.roofZ + roofPolygon[i + 1][2]],
          wallColor
        );
      }
    }
  }