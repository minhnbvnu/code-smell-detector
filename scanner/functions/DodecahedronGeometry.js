function DodecahedronGeometry(radius, detail) {

  Geometry.call(this);

  this.type = 'DodecahedronGeometry';

  this.parameters = {
    radius: radius,
    detail: detail
  };

  this.fromBufferGeometry(new DodecahedronBufferGeometry(radius, detail));
  this.mergeVertices();

}