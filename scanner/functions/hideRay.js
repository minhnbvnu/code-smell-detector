function hideRay (evt) {
      var controllerConfig = config[evt.detail.name];
      if (!controllerConfig) { return; }
      el.setAttribute('raycaster', 'showLine', false);
    }