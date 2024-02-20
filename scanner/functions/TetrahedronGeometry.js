function TetrahedronGeometry(radius, detail) {

  Geometry.call(this);

  this.type = 'TetrahedronGeometry';

  this.parameters = {
    radius: radius,
    detail: detail
  };

  this.fromBufferGeometry(new TetrahedronBufferGeometry(radius, detail));
  this.mergeVertices();

}