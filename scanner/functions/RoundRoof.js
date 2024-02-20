function RoundRoof(triangles, properties, polygon, dim, roofColor, wallColor) {
    // no round roofs for polygons with holes
    if (polygon.length > 1 || properties.roofDirection === undefined) {
      return FlatRoof(triangles, properties, polygon, dim, roofColor);
    }

    return FlatRoof(triangles, properties, polygon, dim, roofColor);
    // const ridge = getRidge (properties.roofDirection, dim.center, polygon[0]);
    // if (!ridge) {
    //   return FlatRoof(triangles, properties, polygon, dim, roofColor);
    // }
    //
    // const distances = getRidgeDistances(polygon[0], ridge.index); // TODO: polygon[0] ???
    // const maxDistance = Math.max(...distances);
    //
    //
    //
    //
    //
    // const zPos = dim.roofZ;
    // const yNum = split.NUM_Y_SEGMENTS/2;
    //
    // const quarterCircle = Math.PI/2;
    // const circleOffset = -quarterCircle;
    //
    // let currYAngle, nextYAngle;
    // let x1, y1;
    // let x2, y2;
    // let size1, size2;
    // let newHeight, newZPos;
    //
    // // goes top-down
    // for (let i = 0; i < yNum; i++) {
    //   currYAngle = ( i   /yNum)*quarterCircle + circleOffset;
    //   nextYAngle = ((i+1)/yNum)*quarterCircle + circleOffset;
    //
    //   x1 = Math.cos(currYAngle);
    //   y1 = Math.sin(currYAngle);
    //
    //   x2 = Math.cos(nextYAngle);
    //   y2 = Math.sin(nextYAngle);
    //
    //   // size1 = x1*dim.size; // width
    //   // size2 = x2*dim.size; // width
    //
    //   newHeight = (y2-y1)*dim.roofHeight;
    //   newZPos = zPos - y2*dim.roofHeight;
    //
    //   // split.cylinder(buffers, center, radius2, radius1, newHeight, newZPos, color);
    // }
  }