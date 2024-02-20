function IcosahedronGeometry(radius, detail) {

  Geometry.call(this);

  this.type = 'IcosahedronGeometry';

  this.parameters = {
    radius: radius,
    detail: detail
  };

  this.fromBufferGeometry(new IcosahedronBufferGeometry(radius, detail));
  this.mergeVertices();

}