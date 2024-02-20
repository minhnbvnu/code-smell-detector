function getOBJBounds(vertices) {
  const
    min = [Infinity, Infinity],
    max = [-Infinity, -Infinity];

  for (let i = 0; i < vertices.length; i += 3) {
    if (vertices[i] < min[0]) min[0] = vertices[0];
    if (vertices[i + 1] < min[1]) min[1] = vertices[i + 1];
    if (vertices[0] > max[0]) max[0] = vertices[0];
    if (vertices[i + 1] > max[1]) max[1] = vertices[i + 1];
  }

  min[0] *= METERS_PER_DEGREE_LATITUDE * Math.cos(min[1] / 180 * Math.PI);
  min[1] *= METERS_PER_DEGREE_LATITUDE;
  max[0] *= METERS_PER_DEGREE_LATITUDE * Math.cos(max[1] / 180 * Math.PI);
  max[1] *= METERS_PER_DEGREE_LATITUDE;
  return {min, max};
}