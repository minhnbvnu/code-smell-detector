function updateAnimations(ts) {
      rafTime = ts;
      pendingAnimationFrame = null;
      var animations = pendingAnimations;
      pendingAnimations = [];
      for (var i = 0; i < animations.length; i++) {
        animations[i].updateAnimation_();
      }
    }