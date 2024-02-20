function DirectionalLightHelper(light, size, color) {

  Object3D.call(this);

  this.light = light;
  this.light.updateMatrixWorld();

  this.matrix = light.matrixWorld;
  this.matrixAutoUpdate = false;

  this.color = color;

  if (size === undefined) size = 1;

  var geometry = new BufferGeometry();
  geometry.addAttribute('position', new Float32BufferAttribute([
    -size, size, 0,
    size, size, 0,
    size, -size, 0,
    -size, -size, 0,
    -size, size, 0
  ], 3));

  var material = new LineBasicMaterial({ fog: false });

  this.lightPlane = new Line(geometry, material);
  this.add(this.lightPlane);

  geometry = new BufferGeometry();
  geometry.addAttribute('position', new Float32BufferAttribute([0, 0, 0, 0, 0, 1], 3));

  this.targetLine = new Line(geometry, material);
  this.add(this.targetLine);

  this.update();

}