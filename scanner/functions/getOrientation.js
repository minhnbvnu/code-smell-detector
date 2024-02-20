function getOrientation(wrapperElement) {
  if (wrapperElement != null) {
    const {
      width
    } = wrapperElement.getBoundingClientRect();
    return width > VERTICAL_MODE_MAX_WIDTH ? 'horizontal' : 'vertical';
  }

  return null;
}