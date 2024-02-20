function BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments) {

  Geometry.call(this);

  this.type = 'BoxGeometry';

  this.parameters = {
    width: width,
    height: height,
    depth: depth,
    widthSegments: widthSegments,
    heightSegments: heightSegments,
    depthSegments: depthSegments
  };

  this.fromBufferGeometry(new BoxBufferGeometry(width, height, depth, widthSegments, heightSegments, depthSegments));
  this.mergeVertices();

}