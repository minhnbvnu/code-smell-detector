function VertexNormalsHelper(object, size, hex, linewidth) {

  this.object = object;

  this.size = (size !== undefined) ? size : 1;

  var color = (hex !== undefined) ? hex : 0xff0000;

  var width = (linewidth !== undefined) ? linewidth : 1;

  //

  var nNormals = 0;

  var objGeometry = this.object.geometry;

  if (objGeometry && objGeometry.isGeometry) {

    nNormals = objGeometry.faces.length * 3;

  } else if (objGeometry && objGeometry.isBufferGeometry) {

    nNormals = objGeometry.attributes.normal.count;

  }

  //

  var geometry = new BufferGeometry();

  var positions = new Float32BufferAttribute(nNormals * 2 * 3, 3);

  geometry.addAttribute('position', positions);

  LineSegments.call(this, geometry, new LineBasicMaterial({ color: color, linewidth: width }));

  //

  this.matrixAutoUpdate = false;

  this.update();

}