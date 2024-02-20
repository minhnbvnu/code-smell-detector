function Box3Helper(box, hex) {

  this.type = 'Box3Helper';

  this.box = box;

  var color = (hex !== undefined) ? hex : 0xffff00;

  var indices = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]);

  var positions = [1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1];

  var geometry = new BufferGeometry();

  geometry.setIndex(new BufferAttribute(indices, 1));

  geometry.addAttribute('position', new Float32BufferAttribute(positions, 3));

  LineSegments.call(this, geometry, new LineBasicMaterial({ color: color }));

  this.geometry.computeBoundingSphere();

}