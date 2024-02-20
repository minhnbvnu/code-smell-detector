function smoothScroll({ scrollTarget, scrollToTop, percent = 10, onScrollEnd }) {
  const currentScrollTop = getScrollTop(scrollTarget);

  smooth({
    currentScrollTop,
    scrollToTop,
    scrollFn: (scrollTop) => scrollTo(scrollTarget, scrollTop),
    percent,
    onScrollEnd,
  });
}