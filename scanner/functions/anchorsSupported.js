function anchorsSupported (sceneEl) {
  var xrManager = sceneEl.renderer.xr;
  var session = xrManager.getSession();
  return (session && session.restorePersistentAnchor);
}