function isStaticallyPositioned(element) {
  const position = getComputedStyle(element).getPropertyValue('position');
  return position === 'static';
}