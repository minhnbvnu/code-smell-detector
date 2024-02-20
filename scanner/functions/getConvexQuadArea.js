function getConvexQuadArea(quad) {
  return getTriangleArea( quad[0], quad[1], quad[2]) + 
         getTriangleArea( quad[0], quad[2], quad[3]);
}