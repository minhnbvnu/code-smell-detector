function scheduleUpdateAnimation(animation) {
      pendingAnimations.push(animation);
      if (!pendingAnimationFrame)
        pendingAnimationFrame = requestAnimationFrame(updateAnimations);
    }