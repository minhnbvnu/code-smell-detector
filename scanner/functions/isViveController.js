function isViveController (trackedControls) {
  var controller = trackedControls && trackedControls.controller;
  var isVive = controller && (controller.id && controller.id.indexOf('OpenVR ') === 0 ||
    (controller.profiles &&
     controller.profiles[0] &&
     controller.profiles[0] === 'htc-vive'));
  return isVive;
}