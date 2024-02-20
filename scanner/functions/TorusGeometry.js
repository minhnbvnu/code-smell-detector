function TorusGeometry(radius, tube, radialSegments, tubularSegments, arc) {

  Geometry.call(this);

  this.type = 'TorusGeometry';

  this.parameters = {
    radius: radius,
    tube: tube,
    radialSegments: radialSegments,
    tubularSegments: tubularSegments,
    arc: arc
  };

  this.fromBufferGeometry(new TorusBufferGeometry(radius, tube, radialSegments, tubularSegments, arc));
  this.mergeVertices();

}