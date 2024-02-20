function BoxHelper(object, color) {

  this.object = object;

  if (color === undefined) color = 0xffff00;

  var indices = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]);
  var positions = new Float32Array(8 * 3);

  var geometry = new BufferGeometry();
  geometry.setIndex(new BufferAttribute(indices, 1));
  geometry.addAttribute('position', new BufferAttribute(positions, 3));

  LineSegments.call(this, geometry, new LineBasicMaterial({ color: color }));

  this.matrixAutoUpdate = false;

  this.update();

}