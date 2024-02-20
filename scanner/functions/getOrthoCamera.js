function getOrthoCamera(w, h) {
  return new THREE.OrthographicCamera(-w, w, h, -h, -100, 100);
}