function highlightElements(needle) {
    if (needle.length == 0) {
      highlightAll();
      return;
    }
    needle = needle.toLowerCase();
    $(".emojis li").each(function (index, el) {
      if (isElementMatching($('.name', el), needle)) {
        $(el).show();
      } else {
        $(el).hide();
      }
    });
  }