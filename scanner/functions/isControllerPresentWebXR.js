function isControllerPresentWebXR (component, id, queryObject) {
  var controllers;
  var sceneEl = component.el.sceneEl;
  var trackedControlsSystem = sceneEl && sceneEl.systems['tracked-controls-webxr'];
  if (!trackedControlsSystem) { return false; }

  controllers = trackedControlsSystem.controllers;
  if (!controllers || !controllers.length) { return false; }

  return findMatchingControllerWebXR(
    controllers, id,
    queryObject.hand, queryObject.index, queryObject.iterateControllerProfiles, queryObject.handTracking);
}