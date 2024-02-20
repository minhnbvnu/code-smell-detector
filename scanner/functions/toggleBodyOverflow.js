function toggleBodyOverflow(enable) {
  const MODAL_OPEN = 'modal-open';
  const FIXED_CONTENT = '.navbar-fixed-top, .navbar-fixed-bottom';
  const body = document.body;
  if (enable) {
    removeClass(body, MODAL_OPEN);
    body.style.paddingRight = null;
    [...document.querySelectorAll(FIXED_CONTENT)].forEach((node) => {
      node.style.paddingRight = null;
    });
  } else {
    const documentHasScrollbar =
      hasScrollbar(document.documentElement) || hasScrollbar(document.body);
    if (documentHasScrollbar) {
      const scrollbarWidth = getScrollbarWidth();
      body.style.paddingRight = `${scrollbarWidth}px`;
      [...document.querySelectorAll(FIXED_CONTENT)].forEach((node) => {
        node.style.paddingRight = `${scrollbarWidth}px`;
      });
    }
    addClass(body, MODAL_OPEN);
  }
}