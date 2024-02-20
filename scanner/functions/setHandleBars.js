function setHandleBars(bar) {
  var coords = $unprefixed.attr("data-coords").split(" ");

  var top = coords[0];
  var right = coords[1];
  var bottom = coords[2];
  var left = coords[3];

  var top_px = Math.round((top / 100) * height);
  var right_px = Math.round((1 - right / 100) * width);
  var bottom_px = Math.round((1 - bottom / 100) * height);
  var left_px = Math.round((left / 100) * width);

  var padding = 20;

  var bar_width = right_px - left_px - padding * 2;
  var bar_height = bottom_px - top_px - padding * 2;

  var x_center = (right_px + left_px) / 2;
  var y_center = (top_px + bottom_px) / 2;

  if (bar !== "top") {
    $(".top.bar")
      .css("top", top_px)
      .css("left", x_center);
  }
  if (bar !== "right") {
    $(".right.bar")
      .css("top", y_center)
      .css("left", right_px);
  }
  if (bar !== "bottom") {
    $(".bottom.bar")
      .css("top", bottom_px)
      .css("left", x_center);
  }
  if (bar !== "left") {
    $(".left.bar")
      .css("top", y_center)
      .css("left", left_px);
  }
}