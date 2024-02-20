function ArrowHelper(dir, origin, length, color, headLength, headWidth) {

  // dir is assumed to be normalized

  Object3D.call(this);

  if (dir === undefined) dir = new THREE.Vector3(0, 0, 1);
  if (origin === undefined) origin = new THREE.Vector3(0, 0, 0);
  if (length === undefined) length = 1;
  if (color === undefined) color = 0xffff00;
  if (headLength === undefined) headLength = 0.2 * length;
  if (headWidth === undefined) headWidth = 0.2 * headLength;

  if (lineGeometry === undefined) {

    lineGeometry = new BufferGeometry();
    lineGeometry.addAttribute('position', new Float32BufferAttribute([0, 0, 0, 0, 1, 0], 3));

    coneGeometry = new CylinderBufferGeometry(0, 0.5, 1, 5, 1);
    coneGeometry.translate(0, -0.5, 0);

  }

  this.position.copy(origin);

  this.line = new Line(lineGeometry, new LineBasicMaterial({ color: color }));
  this.line.matrixAutoUpdate = false;
  this.add(this.line);

  this.cone = new Mesh(coneGeometry, new MeshBasicMaterial({ color: color }));
  this.cone.matrixAutoUpdate = false;
  this.add(this.cone);

  this.setDirection(dir);
  this.setLength(length, headLength, headWidth);

}