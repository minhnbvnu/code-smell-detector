function setupTrackedControls (controllerType) {
    var trackedControls;
    el.setAttribute('tracked-controls', '');
    trackedControls = el.components['tracked-controls'];
    trackedControls.controller = {id: controllerType, connected: true};
  }