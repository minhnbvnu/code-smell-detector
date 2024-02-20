function preventGhostClick(x, y) {
    if (!touchCoordinates) {
      $rootElement[0].addEventListener('click', onClick, true);
      $rootElement[0].addEventListener('touchstart', onTouchStart, true);
      touchCoordinates = [];
    }

    lastPreventedTime = Date.now();

    checkAllowableRegions(touchCoordinates, x, y);
  }