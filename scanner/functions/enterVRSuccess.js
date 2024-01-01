function enterVRSuccess (resolve) {
      // vrdisplaypresentchange fires only once when the first requestPresent is completed;
      // the first requestPresent could be called from ondisplayactivate and there is no way
      // to setup everything from there. Thus, we need to emulate another vrdisplaypresentchange
      // for the actual requestPresent. Need to make sure there are no issues with firing the
      // vrdisplaypresentchange multiple times.
      var event;
      if (window.hasNativeWebVRImplementation && !window.hasNativeWebXRImplementation) {
        event = new CustomEvent('vrdisplaypresentchange', {detail: {display: utils.device.getVRDisplay()}});
        window.dispatchEvent(event);
      }

      if (useAR) {
        self.addState('ar-mode');
      } else {
        self.addState('vr-mode');
      }
      self.emit('enter-vr', {target: self});
      // Lock to landscape orientation on mobile.
      if (!self.hasWebXR && self.isMobile && screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape');
      }
      self.addFullScreenStyles();

      // On mobile, the polyfill handles fullscreen.
      // TODO: 07/16 Chromium builds break when `requestFullscreen`ing on a canvas
      // that we are also `requestPresent`ing. Until then, don't fullscreen if headset
      // connected.
      if (!self.isMobile && !self.checkHeadsetConnected()) {
        requestFullscreen(self.canvas);
      }

      self.resize();
      if (resolve) { resolve(); }
    }