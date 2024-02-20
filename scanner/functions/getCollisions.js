function getCollisions(targetRect, popoverRect, offsetLeft, offsetBottom) {
  if (offsetLeft === void 0) {
    offsetLeft = 0;
  }

  if (offsetBottom === void 0) {
    offsetBottom = 0;
  }

  var collisions = {
    top: targetRect.top - popoverRect.height < 0,
    right: window.innerWidth < targetRect.left + popoverRect.width - offsetLeft,
    bottom: window.innerHeight < targetRect.bottom + popoverRect.height - offsetBottom,
    left: targetRect.left + targetRect.width - popoverRect.width < 0
  };
  var directionRight = collisions.right && !collisions.left;
  var directionLeft = collisions.left && !collisions.right;
  var directionUp = collisions.bottom && !collisions.top;
  var directionDown = collisions.top && !collisions.bottom;
  return {
    directionRight: directionRight,
    directionLeft: directionLeft,
    directionUp: directionUp,
    directionDown: directionDown
  };
}