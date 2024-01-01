function findMatchingControllerWebXR (controllers, idPrefix, handedness, index, iterateProfiles, handTracking) {
  var i;
  var j;
  var controller;
  var controllerMatch = false;
  var controllerHasHandedness;
  var profiles;
  for (i = 0; i < controllers.length; i++) {
    controller = controllers[i];
    profiles = controller.profiles;
    if (handTracking) {
      controllerMatch = controller.hand;
    } else {
      if (iterateProfiles) {
        for (j = 0; j < profiles.length; j++) {
          controllerMatch = profiles[j].startsWith(idPrefix);
          if (controllerMatch) { break; }
        }
      } else {
        controllerMatch = profiles.length > 0 && profiles[0].startsWith(idPrefix);
      }
    }
    if (!controllerMatch) { continue; }
    // Vive controllers are assigned handedness at runtime and it might not be always available.
    controllerHasHandedness = controller.handedness === 'right' || controller.handedness === 'left';
    if (controllerHasHandedness) {
      if (controller.handedness === handedness) { return controllers[i]; }
    } else { // Fallback to index if controller has no handedness.
      if ((i === index)) { return controllers[i]; }
    }
  }
  return undefined;
}