function OctahedronGeometry(radius, detail) {

  Geometry.call(this);

  this.type = 'OctahedronGeometry';

  this.parameters = {
    radius: radius,
    detail: detail
  };

  this.fromBufferGeometry(new OctahedronBufferGeometry(radius, detail));
  this.mergeVertices();

}