function SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength) {

  Geometry.call(this);

  this.type = 'SphereGeometry';

  this.parameters = {
    radius: radius,
    widthSegments: widthSegments,
    heightSegments: heightSegments,
    phiStart: phiStart,
    phiLength: phiLength,
    thetaStart: thetaStart,
    thetaLength: thetaLength
  };

  this.fromBufferGeometry(new SphereBufferGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength));
  this.mergeVertices();

}