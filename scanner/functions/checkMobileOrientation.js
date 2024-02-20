function checkMobileOrientation() {
      if (!game.device.desktop && game.scale.isPortrait) {
        setTimeout(checkMobileOrientation, 200);
      } else {
        videoInit();
      }
    }