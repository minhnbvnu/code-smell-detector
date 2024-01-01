function isControllerPresentWebVR (component, idPrefix, queryObject) {
  var gamepads;
  var sceneEl = component.el.sceneEl;
  var trackedControlsSystem;
  var filterControllerIndex = queryObject.index || 0;

  if (!idPrefix) { return false; }

  trackedControlsSystem = sceneEl && sceneEl.systems['tracked-controls-webvr'];
  if (!trackedControlsSystem) { return false; }

  gamepads = trackedControlsSystem.controllers;
  if (!gamepads.length) { return false; }

  return !!findMatchingControllerWebVR(gamepads, null, idPrefix, queryObject.hand,
                                  filterControllerIndex);
}