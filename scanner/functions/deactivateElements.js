function deactivateElements() {
    if (ionic.transition && ionic.transition.isActive) {
      setTimeout(deactivateElements, 400);
      return;
    }

    for (var key in activeElements) {
      if (activeElements[key]) {
        activeElements[key].classList.remove(ACTIVATED_CLASS);
        delete activeElements[key];
      }
    }
  }