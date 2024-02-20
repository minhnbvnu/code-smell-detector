function sizes() {
  console.log("sizes();");

  // Adjust for 10px padding on each side because of the handles
  var adjusted_width = parseInt(width) + 20;
  var adjusted_height = parseInt(height) + 20;

  $demo_width.val(width);
  $demo_height.val(height);

  $box.css({
    width: adjusted_width,
    height: adjusted_height
  });
}