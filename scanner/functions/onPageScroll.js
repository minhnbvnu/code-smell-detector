function onPageScroll(event) {
  const { vanPageScroller = [] } = getCurrentPage();
  vanPageScroller.forEach((scroller) => {
    if (typeof scroller === 'function') {
      // @ts-ignore
      scroller(event);
    }
  });
}