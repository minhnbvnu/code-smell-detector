function maybeScrollToHash() {
  if (window.location.hash && $(window.location.hash).length) {
    var newTop = $(window.location.hash).offset().top - 57;
    $(window).scrollTop(newTop);
  }
}