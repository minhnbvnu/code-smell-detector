function ExtrudeGeometry(shapes, options) {

  Geometry.call(this);

  this.type = 'ExtrudeGeometry';

  this.parameters = {
    shapes: shapes,
    options: options
  };

  this.fromBufferGeometry(new ExtrudeBufferGeometry(shapes, options));
  this.mergeVertices();

}