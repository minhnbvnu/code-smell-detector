function getTopPosition(targetRect, popoverRect, isDirectionUp) {
  return {
    top: isDirectionUp ? targetRect.top - popoverRect.height + window.pageYOffset + "px" : targetRect.top + targetRect.height + window.pageYOffset + "px"
  };
}