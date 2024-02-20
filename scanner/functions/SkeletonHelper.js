function SkeletonHelper(object) {

  var bones = getBoneList(object);

  var geometry = new BufferGeometry();

  var vertices = [];
  var colors = [];

  var color1 = new Color(0, 0, 1);
  var color2 = new Color(0, 1, 0);

  for (var i = 0; i < bones.length; i++) {

    var bone = bones[i];

    if (bone.parent && bone.parent.isBone) {

      vertices.push(0, 0, 0);
      vertices.push(0, 0, 0);
      colors.push(color1.r, color1.g, color1.b);
      colors.push(color2.r, color2.g, color2.b);

    }

  }

  geometry.addAttribute('position', new Float32BufferAttribute(vertices, 3));
  geometry.addAttribute('color', new Float32BufferAttribute(colors, 3));

  var material = new LineBasicMaterial({ vertexColors: VertexColors, depthTest: false, depthWrite: false, transparent: true });

  LineSegments.call(this, geometry, material);

  this.root = object;
  this.bones = bones;

  this.matrix = object.matrixWorld;
  this.matrixAutoUpdate = false;

}