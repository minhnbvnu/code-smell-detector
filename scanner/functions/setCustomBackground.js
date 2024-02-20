function setCustomBackground(url) {
  var style =
    ".shadowboard, .clipboard { background-image: url(" + url + "); }";
  $("#custom_background").html(style);

  // Scroll to top of page
  scrollTop();
}