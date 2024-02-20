function RingGeometry(innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength) {

  Geometry.call(this);

  this.type = 'RingGeometry';

  this.parameters = {
    innerRadius: innerRadius,
    outerRadius: outerRadius,
    thetaSegments: thetaSegments,
    phiSegments: phiSegments,
    thetaStart: thetaStart,
    thetaLength: thetaLength
  };

  this.fromBufferGeometry(new RingBufferGeometry(innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength));
  this.mergeVertices();

}