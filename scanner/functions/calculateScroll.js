function calculateScroll(scrollContainer, lastScroll) {
  let scroll = getScrollPosition(scrollContainer);

  scroll.deltaY = scroll.y - (lastScroll ? lastScroll.y : scroll.y);
  scroll.deltaX = scroll.x - (lastScroll ? lastScroll.x : scroll.x);

  return scroll;
}