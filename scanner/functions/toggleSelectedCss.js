function toggleSelectedCss(ele) {
    $("[data-url]").removeClass(CLASS_IS_SELECTED);
    ele && ele.length && ele.addClass(CLASS_IS_SELECTED);
  }