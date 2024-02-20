function getCamera(fov) {
  return new THREE.PerspectiveCamera(fov ? fov : 35, 1, .1, 100);
}