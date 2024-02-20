function ShapeGeometry(shapes, curveSegments) {

  Geometry.call(this);

  this.type = 'ShapeGeometry';

  if (typeof curveSegments === 'object') {

    console.warn('THREE.ShapeGeometry: Options parameter has been removed.');

    curveSegments = curveSegments.curveSegments;

  }

  this.parameters = {
    shapes: shapes,
    curveSegments: curveSegments
  };

  this.fromBufferGeometry(new ShapeBufferGeometry(shapes, curveSegments));
  this.mergeVertices();

}