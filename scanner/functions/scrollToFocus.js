function scrollToFocus() {
  const element = entryWithFocus();

  // make sure we have an element to scroll to
  if (element.length > 0) {
    const offset = element.offset().top;
    const elementHeight = element.outerHeight(true) * 2;

    const visible_area_start = $(window).scrollTop();
    const visible_area_end = visible_area_start + window.innerHeight;

    if (offset < visible_area_start + elementHeight) {
      // scrolling up
      window.scroll({top: offset - elementHeight, left: 0, behavior: 'smooth'});
    } else if (offset > visible_area_end - elementHeight) {
      // scrolling down
      window.scroll({top: offset - window.innerHeight + elementHeight, left: 0, behavior: 'smooth'});
    }
  }
}