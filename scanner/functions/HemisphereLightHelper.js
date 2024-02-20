function HemisphereLightHelper(light, size, color) {

  Object3D.call(this);

  this.light = light;
  this.light.updateMatrixWorld();

  this.matrix = light.matrixWorld;
  this.matrixAutoUpdate = false;

  this.color = color;

  var geometry = new OctahedronBufferGeometry(size);
  geometry.rotateY(Math.PI * 0.5);

  this.material = new MeshBasicMaterial({ wireframe: true, fog: false });
  if (this.color === undefined) this.material.vertexColors = VertexColors;

  var position = geometry.getAttribute('position');
  var colors = new Float32Array(position.count * 3);

  geometry.addAttribute('color', new BufferAttribute(colors, 3));

  this.add(new Mesh(geometry, this.material));

  this.update();

}