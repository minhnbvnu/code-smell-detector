function LatheGeometry(points, segments, phiStart, phiLength) {

  Geometry.call(this);

  this.type = 'LatheGeometry';

  this.parameters = {
    points: points,
    segments: segments,
    phiStart: phiStart,
    phiLength: phiLength
  };

  this.fromBufferGeometry(new LatheBufferGeometry(points, segments, phiStart, phiLength));
  this.mergeVertices();

}