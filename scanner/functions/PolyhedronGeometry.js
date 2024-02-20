function PolyhedronGeometry(vertices, indices, radius, detail) {

  Geometry.call(this);

  this.type = 'PolyhedronGeometry';

  this.parameters = {
    vertices: vertices,
    indices: indices,
    radius: radius,
    detail: detail
  };

  this.fromBufferGeometry(new PolyhedronBufferGeometry(vertices, indices, radius, detail));
  this.mergeVertices();

}