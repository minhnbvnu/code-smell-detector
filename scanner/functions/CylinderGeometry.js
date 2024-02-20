function CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength) {

  Geometry.call(this);

  this.type = 'CylinderGeometry';

  this.parameters = {
    radiusTop: radiusTop,
    radiusBottom: radiusBottom,
    height: height,
    radialSegments: radialSegments,
    heightSegments: heightSegments,
    openEnded: openEnded,
    thetaStart: thetaStart,
    thetaLength: thetaLength
  };

  this.fromBufferGeometry(new CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength));
  this.mergeVertices();

}