function setupTestControllers (el) {
    var component = el.components['vive-focus-controls'];
    el.sceneEl.systems['tracked-controls-webvr'].controllers = component.controllersWhenPresent;
    component.checkIfControllerPresent();
  }