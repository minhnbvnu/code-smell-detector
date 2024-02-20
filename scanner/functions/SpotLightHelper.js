function SpotLightHelper(light, color) {

  Object3D.call(this);

  this.light = light;
  this.light.updateMatrixWorld();

  this.matrix = light.matrixWorld;
  this.matrixAutoUpdate = false;

  this.color = color;

  var geometry = new BufferGeometry();

  var positions = [
    0, 0, 0, 0, 0, 1,
    0, 0, 0, 1, 0, 1,
    0, 0, 0, -1, 0, 1,
    0, 0, 0, 0, 1, 1,
    0, 0, 0, 0, -1, 1
  ];

  for (var i = 0, j = 1, l = 32; i < l; i++, j++) {

    var p1 = (i / l) * Math.PI * 2;
    var p2 = (j / l) * Math.PI * 2;

    positions.push(
      Math.cos(p1), Math.sin(p1), 1,
      Math.cos(p2), Math.sin(p2), 1
    );

  }

  geometry.addAttribute('position', new Float32BufferAttribute(positions, 3));

  var material = new LineBasicMaterial({ fog: false });

  this.cone = new LineSegments(geometry, material);
  this.add(this.cone);

  this.update();

}