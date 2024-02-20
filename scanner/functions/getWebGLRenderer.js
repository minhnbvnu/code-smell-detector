function getWebGLRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(800, 800);
  const canvas = renderer.domElement;
  canvas.style.width = '400px';
  canvas.style.height = '400px';
  return renderer;
}