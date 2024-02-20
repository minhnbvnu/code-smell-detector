function cancelUpdateAnimation(animation) {
      pendingAnimations.splice(pendingAnimations.indexOf(animation), 1);
      if (pendingAnimations.length == 0) {
        cancelAnimationFrame(pendingAnimationFrame);
        pendingAnimationFrame = null;
      }
    }