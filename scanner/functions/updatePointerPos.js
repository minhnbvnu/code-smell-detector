function updatePointerPos()
  {
    var ttRect;

    if (!targetElement)
      return;

    // position depend on target and tt width
    ttRect = ttElement.getBoundingClientRect();
    pointerRect = elPointer.getBoundingClientRect();

    switch (ttModel.stickTo) {
      case html5tooltipsPredefined.stickTo.bottom:
        elPointer.style.left = parseInt((ttRect.width - pointerRect.width) / 2) + "px";
        elPointer.style.top = -1 * pointerRect.height + "px";
        break;

      case html5tooltipsPredefined.stickTo.left:
        elPointer.style.left = ttRect.width - 2 + "px";
        elPointer.style.top = parseInt((ttRect.height - pointerRect.height) / 2) + "px";
        break;

      case html5tooltipsPredefined.stickTo.right:
        elPointer.style.left = -1 * pointerRect.width + 1 + "px";
        elPointer.style.top = parseInt((ttRect.height - pointerRect.height) / 2) + "px";
        break;

      case html5tooltipsPredefined.stickTo.top:
        elPointer.style.left = parseInt((ttRect.width - pointerRect.width) / 2) + "px";
        elPointer.style.top = ttRect.height - 2 + "px";
        break;
    }
  }