function hasScrollbar(el) {
  const SCROLL = 'scroll';
  const hasVScroll = el.scrollHeight > el.clientHeight;
  const style = getComputedStyle(el);
  return hasVScroll || style.overflow === SCROLL || style.overflowY === SCROLL;
}