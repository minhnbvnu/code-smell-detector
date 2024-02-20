function finishCustomizing() {
  // Reset from customizing option
  $html.removeClass("customizing start-customizing customizing-no-poly");
  $(".finish").removeAttr("data-shape");
  $demo.unbind("click");
}