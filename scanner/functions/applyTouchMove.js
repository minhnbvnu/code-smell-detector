function applyTouchMove(differenceX, differenceY) {
    element.scrollTop -= differenceY;

    element.scrollLeft -= differenceX;

    updateGeometry(i);
  }