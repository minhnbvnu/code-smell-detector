function PyramidRoof(triangles, properties, polygon, dim, roofColor) {
    if (properties.shape === 'cylinder') {
      split.cylinder(triangles, dim.center, dim.radius, 0, dim.roofHeight, dim.roofZ, roofColor);
    } else {
      split.pyramid(triangles, polygon, dim.center, dim.roofHeight, dim.roofZ, roofColor);
    }
  }