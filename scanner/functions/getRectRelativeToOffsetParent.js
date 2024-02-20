function getRectRelativeToOffsetParent(element, offsetParent) {
  let rect = element.getBoundingClientRect();
  let offsetRect = offsetParent.getBoundingClientRect();
  return {
    x: rect.x - offsetRect.x,
    y: rect.y - offsetRect.y,
    width: rect.width,
    height: rect.height,
  };
}