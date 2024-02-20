function isAvailableAtPosition(trigger, popup, placement) {
  const triggerRect = trigger.getBoundingClientRect();
  const popupRect = popup.getBoundingClientRect();
  const viewPortSize = getViewportSize();
  let top = true;
  let right = true;
  let bottom = true;
  let left = true;
  switch (placement) {
    case PLACEMENTS.TOP:
      top = triggerRect.top >= popupRect.height;
      left = triggerRect.left + triggerRect.width / 2 >= popupRect.width / 2;
      right =
        triggerRect.right - triggerRect.width / 2 + popupRect.width / 2 <=
        viewPortSize.width;
      break;
    case PLACEMENTS.BOTTOM:
      bottom = triggerRect.bottom + popupRect.height <= viewPortSize.height;
      left = triggerRect.left + triggerRect.width / 2 >= popupRect.width / 2;
      right =
        triggerRect.right - triggerRect.width / 2 + popupRect.width / 2 <=
        viewPortSize.width;
      break;
    case PLACEMENTS.RIGHT:
      right = triggerRect.right + popupRect.width <= viewPortSize.width;
      top = triggerRect.top + triggerRect.height / 2 >= popupRect.height / 2;
      bottom =
        triggerRect.bottom - triggerRect.height / 2 + popupRect.height / 2 <=
        viewPortSize.height;
      break;
    case PLACEMENTS.LEFT:
      left = triggerRect.left >= popupRect.width;
      top = triggerRect.top + triggerRect.height / 2 >= popupRect.height / 2;
      bottom =
        triggerRect.bottom - triggerRect.height / 2 + popupRect.height / 2 <=
        viewPortSize.height;
      break;
  }
  return top && right && bottom && left;
}