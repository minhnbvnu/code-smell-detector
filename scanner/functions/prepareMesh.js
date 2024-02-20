function prepareMesh(w, c) {

  var g = new MeshLine();
  g.setGeometry(geo, function(p) { return p; });

  const v = Math.random() > .5;
  const material = new MeshLineMaterial({
    map: v ? strokeTexture : strokeTexture2,
    useMap: true,
    color: gradient.getAt(c),
    resolution: resolution,
    sizeAttenuation: true,
    lineWidth: v ? 2 * w : 1.5 * w,
    near: camera.near,
    far: camera.far,
    repeat: new THREE.Vector2(1, 1),
    alphaTest: .75 * .5,
    depthWrite: true,
    depthTest: true,
    transparent: true,
    opacity: 1,
    dashArray: new THREE.Vector2(1, 0),
    dashOffset: 0,
  });

  var mesh = new THREE.Mesh(g.geometry, material);
  mesh.geo = geo;
  mesh.g = g;

  return mesh;
}