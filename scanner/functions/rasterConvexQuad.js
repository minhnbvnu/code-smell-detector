function rasterConvexQuad(quad) {
  assert(quad.length == 4, 'Error: Quadrilateral with more or less than four vertices');
  const res1 = rasterTriangle(quad[0], quad[1], quad[2]);
  const res2 = rasterTriangle(quad[0], quad[2], quad[3]);
  return res1.concat(res2);
}