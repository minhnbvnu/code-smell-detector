function FaceNormalsHelper(object, size, hex, linewidth) {

  // FaceNormalsHelper only supports THREE.Geometry

  this.object = object;

  this.size = (size !== undefined) ? size : 1;

  var color = (hex !== undefined) ? hex : 0xffff00;

  var width = (linewidth !== undefined) ? linewidth : 1;

  //

  var nNormals = 0;

  var objGeometry = this.object.geometry;

  if (objGeometry && objGeometry.isGeometry) {

    nNormals = objGeometry.faces.length;

  } else {

    console.warn('THREE.FaceNormalsHelper: only THREE.Geometry is supported. Use THREE.VertexNormalsHelper, instead.');

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