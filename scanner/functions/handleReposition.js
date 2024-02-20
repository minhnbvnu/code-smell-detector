function handleReposition(old_width, old_height) {
  $(".handle").each(function() {
    var x_pct = parseInt($(this).css("left")) / old_width;
    var y_pct = parseInt($(this).css("top")) / old_height;

    var new_x = x_pct * width + "px";
    var new_y = y_pct * height + "px";

    // Reposition each handle
    $(this).css({
      left: new_x,
      top: new_y
    });
  });
}