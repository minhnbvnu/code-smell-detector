function exitVRSuccess () {
      self.removeState('vr-mode');
      self.removeState('ar-mode');
      // Lock to landscape orientation on mobile.
      if (self.isMobile && screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
      // Exiting VR in embedded mode, no longer need fullscreen styles.
      if (self.hasAttribute('embedded')) { self.removeFullScreenStyles(); }

      self.resize();
      if (self.isIOS) { utils.forceCanvasResizeSafariMobile(self.canvas); }
      self.renderer.setPixelRatio(window.devicePixelRatio);
      self.emit('exit-vr', {target: self});
    }