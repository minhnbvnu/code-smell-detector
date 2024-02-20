function getScrollbarWidth(recalculate = false) {
  const screenSize = getViewportSize();
  // return directly when already calculated & not force recalculate & screen size not changed
  if (
    scrollbarWidth !== null &&
    !recalculate &&
    screenSize.height === savedScreenSize.height &&
    screenSize.width === savedScreenSize.width
  ) {
    return scrollbarWidth;
  }
  /* istanbul ignore next */
  if (document.readyState === 'loading') {
    return null;
  }
  const div1 = document.createElement('div');
  const div2 = document.createElement('div');
  div1.style.width =
    div2.style.width =
    div1.style.height =
    div2.style.height =
      '100px';
  div1.style.overflow = 'scroll';
  div2.style.overflow = 'hidden';
  document.body.appendChild(div1);
  document.body.appendChild(div2);
  scrollbarWidth = Math.abs(div1.scrollHeight - div2.scrollHeight);
  document.body.removeChild(div1);
  document.body.removeChild(div2);
  // save new screen size
  savedScreenSize = screenSize;
  return scrollbarWidth;
}