function getTooltipPosition(element, mousePosition) {
  const {
    height,
    mouseX,
    mouseY,
    width
  } = mousePosition;
  let top = 0;
  let left = 0;

  if (mouseY + TOOLTIP_OFFSET + element.offsetHeight >= height) {
    if (mouseY - TOOLTIP_OFFSET - element.offsetHeight > 0) {
      top = `${mouseY - element.offsetHeight - TOOLTIP_OFFSET}px`;
    } else {
      top = '0px';
    }
  } else {
    top = `${mouseY + TOOLTIP_OFFSET}px`;
  }

  if (mouseX + TOOLTIP_OFFSET + element.offsetWidth >= width) {
    if (mouseX - TOOLTIP_OFFSET - element.offsetWidth > 0) {
      left = `${mouseX - element.offsetWidth - TOOLTIP_OFFSET}px`;
    } else {
      left = '0px';
    }
  } else {
    left = `${mouseX + TOOLTIP_OFFSET * 2}px`;
  }

  return {
    left,
    top
  };
}