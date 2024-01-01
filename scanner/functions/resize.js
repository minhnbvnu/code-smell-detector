function resize (camera) {
  var embedded = sceneEl.hasAttribute('embedded');
  var size = getSceneCanvasSize(sceneEl.canvas, embedded, sceneEl.maxCanvasSize, sceneEl.is('vr-mode'));
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
   // Notify renderer of size change.
  sceneEl.renderer.setSize(size.width, size.height, false);
}