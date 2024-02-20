function TubeGeometry(path, tubularSegments, radius, radialSegments, closed, taper) {

  Geometry.call(this);

  this.type = 'TubeGeometry';

  this.parameters = {
    path: path,
    tubularSegments: tubularSegments,
    radius: radius,
    radialSegments: radialSegments,
    closed: closed
  };

  if (taper !== undefined) console.warn('THREE.TubeGeometry: taper has been removed.');

  var bufferGeometry = new TubeBufferGeometry(path, tubularSegments, radius, radialSegments, closed);

  // expose internals

  this.tangents = bufferGeometry.tangents;
  this.normals = bufferGeometry.normals;
  this.binormals = bufferGeometry.binormals;

  // create geometry

  this.fromBufferGeometry(bufferGeometry);
  this.mergeVertices();

}