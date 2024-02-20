function setResizeCSSVariable(resizeElement, orientation, percentage) {
  if (resizeElement !== null && orientation !== null) {
    resizeElement.style.setProperty(`--${orientation}-resize-percentage`, `${percentage}%`);
  }
}