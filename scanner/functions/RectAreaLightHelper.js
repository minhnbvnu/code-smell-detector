function RectAreaLightHelper(light, color) {

  Object3D.call(this);

  this.light = light;
  this.light.updateMatrixWorld();

  this.matrix = light.matrixWorld;
  this.matrixAutoUpdate = false;

  this.color = color;

  var material = new LineBasicMaterial({ fog: false });

  var geometry = new BufferGeometry();

  geometry.addAttribute('position', new BufferAttribute(new Float32Array(5 * 3), 3));

  this.line = new Line(geometry, material);
  this.add(this.line);


  this.update();

}