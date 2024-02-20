function calculateInPlacePosition(trigger, content, destination, { horizontalPosition, verticalPosition }) {
  let dropdownRect;
  let positionData = {};
  if (horizontalPosition === 'auto') {
    let triggerRect = trigger.getBoundingClientRect();
    dropdownRect = content.getBoundingClientRect();
    let viewportRight = window.pageXOffset + self.window.innerWidth;
    positionData.horizontalPosition = triggerRect.left + dropdownRect.width > viewportRight ? 'right' : 'left';
  }
  if (verticalPosition === 'above') {
    positionData.verticalPosition = verticalPosition;
    dropdownRect = dropdownRect || content.getBoundingClientRect();
    positionData.style = { top: -dropdownRect.height };
  }
  return positionData;
}