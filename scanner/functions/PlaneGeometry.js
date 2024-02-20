function PlaneGeometry(width, height, widthSegments, heightSegments) {

  Geometry.call(this);

  this.type = 'PlaneGeometry';

  this.parameters = {
    width: width,
    height: height,
    widthSegments: widthSegments,
    heightSegments: heightSegments
  };

  this.fromBufferGeometry(new PlaneBufferGeometry(width, height, widthSegments, heightSegments));
  this.mergeVertices();

}