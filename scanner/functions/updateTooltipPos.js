function updateTooltipPos()
  {
    var targetRect, ttRect;

    if (!targetElement)
      return;

    // update width
    ttElement.style.width = "auto";
    ttRect = ttElement.getBoundingClientRect();

    var maxWidth = ttModel.maxWidth || options.maxWidth;
    if (maxWidth)
      ttElement.style.width = ttRect.width > maxWidth ? maxWidth + "px" : "auto";

    // position depend on target and tt width
    targetRect = targetElement.getBoundingClientRect();
    ttRect = ttElement.getBoundingClientRect();

    switch (ttModel.stickTo) {
      case html5tooltipsPredefined.stickTo.bottom:
        ttElement.style.left = targetRect.left + parseInt((targetRect.width - ttRect.width) / 2) + "px";
        ttElement.style.top = targetRect.top + targetRect.height + parseInt(ttModel.stickDistance) + "px";
        break;

      case html5tooltipsPredefined.stickTo.left:
        ttElement.style.left = targetRect.left - ttRect.width - parseInt(ttModel.stickDistance) + "px";
        ttElement.style.top = targetRect.top + (targetRect.height - ttRect.height) / 2 + "px";
        break;

      case html5tooltipsPredefined.stickTo.right:
        ttElement.style.left = targetRect.left + targetRect.width + parseInt(ttModel.stickDistance) + "px";
        ttElement.style.top = targetRect.top + (targetRect.height - ttRect.height) / 2 + "px";
        break;

      case html5tooltipsPredefined.stickTo.top:
        ttElement.style.left = targetRect.left + (targetRect.width - ttRect.width) / 2 + "px";
        ttElement.style.top = targetRect.top - ttRect.height - parseInt(ttModel.stickDistance) + "px";
        break;
    }
  }