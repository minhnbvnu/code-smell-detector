function DomeRoof(triangles, polygon, dim, roofColor) {
    split.polygon(triangles, polygon, dim.roofZ, roofColor);
    split.dome(triangles, dim.center, dim.radius, dim.roofHeight, dim.roofZ, roofColor);
  }