function ConeRoof(triangles, polygon, dim, roofColor) {
    split.polygon(triangles, polygon, dim.roofZ, roofColor);
    split.cylinder(triangles, dim.center, dim.radius, 0, dim.roofHeight, dim.roofZ, roofColor);
  }