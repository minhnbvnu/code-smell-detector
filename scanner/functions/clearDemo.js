function clearDemo() {
  console.log("clearDemo();");

  // Reset from inset function
  $html.removeClass("insetting");
  $(".inset-round").val("5% 20% 0 10%");

  // Empty the demo
  $handles.empty();
  $functions.empty();
}