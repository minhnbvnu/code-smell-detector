function CameraHelper(camera) {

  var geometry = new BufferGeometry();
  var material = new LineBasicMaterial({ color: 0xffffff, vertexColors: FaceColors });

  var vertices = [];
  var colors = [];

  var pointMap = {};

  // colors

  var colorFrustum = new Color(0xffaa00);
  var colorCone = new Color(0xff0000);
  var colorUp = new Color(0x00aaff);
  var colorTarget = new Color(0xffffff);
  var colorCross = new Color(0x333333);

  // near

  addLine('n1', 'n2', colorFrustum);
  addLine('n2', 'n4', colorFrustum);
  addLine('n4', 'n3', colorFrustum);
  addLine('n3', 'n1', colorFrustum);

  // far

  addLine('f1', 'f2', colorFrustum);
  addLine('f2', 'f4', colorFrustum);
  addLine('f4', 'f3', colorFrustum);
  addLine('f3', 'f1', colorFrustum);

  // sides

  addLine('n1', 'f1', colorFrustum);
  addLine('n2', 'f2', colorFrustum);
  addLine('n3', 'f3', colorFrustum);
  addLine('n4', 'f4', colorFrustum);

  // cone

  addLine('p', 'n1', colorCone);
  addLine('p', 'n2', colorCone);
  addLine('p', 'n3', colorCone);
  addLine('p', 'n4', colorCone);

  // up

  addLine('u1', 'u2', colorUp);
  addLine('u2', 'u3', colorUp);
  addLine('u3', 'u1', colorUp);

  // target

  addLine('c', 't', colorTarget);
  addLine('p', 'c', colorCross);

  // cross

  addLine('cn1', 'cn2', colorCross);
  addLine('cn3', 'cn4', colorCross);

  addLine('cf1', 'cf2', colorCross);
  addLine('cf3', 'cf4', colorCross);

  function addLine(a, b, color) {

    addPoint(a, color);
    addPoint(b, color);

  }

  function addPoint(id, color) {

    vertices.push(0, 0, 0);
    colors.push(color.r, color.g, color.b);

    if (pointMap[id] === undefined) {

      pointMap[id] = [];

    }

    pointMap[id].push((vertices.length / 3) - 1);

  }

  geometry.addAttribute('position', new Float32BufferAttribute(vertices, 3));
  geometry.addAttribute('color', new Float32BufferAttribute(colors, 3));

  LineSegments.call(this, geometry, material);

  this.camera = camera;
  if (this.camera.updateProjectionMatrix) this.camera.updateProjectionMatrix();

  this.matrix = camera.matrixWorld;
  this.matrixAutoUpdate = false;

  this.pointMap = pointMap;

  this.update();

}