function getVerticesInRegion(vertices, region) {
  return vertices.filter( vertex => vertex.get('region') === region );
}