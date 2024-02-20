function FlatRoof(triangles, properties, polygon, dim, roofColor) {
    if (properties.shape === 'cylinder') {
      split.circle(triangles, dim.center, dim.radius, dim.roofZ, roofColor);
    } else {
      split.polygon(triangles, polygon, dim.roofZ, roofColor);
    }
  }