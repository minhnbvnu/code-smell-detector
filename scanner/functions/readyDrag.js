function readyDrag() {
  // Utilizes the awesome draggabilly.js by Dave Desandro
  // Works well on touch devices
  console.log("readyDrag();");

  var box = document.querySelector("#box");
  var handles = box.querySelectorAll(".handle");
  var $functions = $(".functions");

  // Remove handle and point option
  if (type == "polygon" || type == "custom") {
    $(".handle").html('<div class="delete-point"></div>');
    $(".handle").mousedown(function() {
      var count = $(".handle").length;

      // If we have at least a triangle it's okay to remove a point
      if (count > 3) {
        var $this = $(this);
        var point = $(this).attr("data-handle");

        $(".handle").removeClass("show-delete");
        $this.addClass("show-delete");

        $(".delete-point", $this).mousedown(function() {
          // Get rid of the handle and point
          $this.remove();
          $('[data-point="' + point + '"]').remove();

          // Removing the trailing commas, this is pretty hacky but it would be a lot of work to do it the right way
          var functions_html = $(".functions").html();
          var fixed_html = functions_html
            .replace("(, ", "(")
            .replace(", , ", ", ")
            .replace(", )", ")");
          $(".functions").html(fixed_html);

          clipIt();
        });

        $this.mouseup(function() {
          setTimeout(function() {
            $this.removeClass("show-delete");
          }, 3000);
        });
      }
    });
  }

  // If we have a circle, custom, or polygon setup draggibilly normally
  if (type == "circle" || type == "polygon" || type == "custom") {
    // We have already appended handles, now we will attach draggabilly to each of them
    for (var i = 0, len = handles.length; i < len; i++) {
      var handle = handles[i];

      new Draggabilly(handle, {
        containment: true,
        grid: grid
      })
        .on("dragStart", function(instance, e, pointer) {
          i = instance.element.dataset.handle;

          // .changing triggers the bubble burst animation
          $point = $('[data-point="' + i + '"]');
          $point.addClass("changing");

          // If we are changing a circle we are working a little differently than with polygon
          if (type == "circle") {
            special = instance.element.classList[0];
            modifier = getRadiusModifier();

            $position = $(".position.handle");
            position_pos_x = $position.position().left;
            position_pos_y = $position.position().top;

            $radius = $(".radius.handle");
            radius_pos_x = $radius.position().left;
            radius_pos_y = $radius.position().top;

            var max = Math.max(width, height);
            var min = Math.min(width, height);
            max = Math.max(width, height);

            startRadius =
              getRadius(
                radius_pos_x,
                position_pos_x,
                radius_pos_y,
                position_pos_y
              ) / 100;
          }
        })
        .on("dragMove", function(instance, e, pointer) {
          // Returns current position of the dragging handle
          var x = instance.position.x;
          var y = instance.position.y;

          if (type == "circle") {
            // Dragging the center position handle
            if (special == "position") {
              // calculate distance from center center of demo

              var x_delta = width / 2 - x;
              var y_delta = height / 2 - y;

              var max = Math.max(width, height);

              // Calculate the bestest position on the edge of the circle for the radius handle
              // I don't know how the heck this works but it does,
              // Should've spent more time studying in high school...
              var angle = Math.atan2(y_delta, x_delta);

              var handle_x = Math.cos(angle) * startRadius * max + x;
              if (handle_x < 0) {
                var handle_x = 0;
              }
              if (handle_x > width) {
                var handle_x = width;
              }

              var handle_y = Math.sin(angle) * startRadius * max + y;
              if (handle_y < 0) {
                var handle_y = 0;
              }
              if (handle_y > height) {
                var handle_y = height;
              }

              var radius_position =
                "left:" + handle_x + "px; top:" + handle_y + "px";

              $radius.attr("style", radius_position);

              setPoint(x, y);
            }

            // Dragging the radius handle on the edge of the circle
            if (special == "radius") {
              // Calculate the new radius
              var radius = getRadius(x, position_pos_x, y, position_pos_y);

              //
              //
              // BUGGY!
              //
              // This is messed up if ratio is not 1:1
              var radius = radius + "%";

              $point.text(radius);
            }
          }

          // Dragging a polygon handle, easy...
          if (type == "polygon" || type == "custom") {
            setPoint(x, y);
          }

          clipIt();
        })
        .on("dragEnd", function(instance) {
          // Remove all the bubble animations
          $(".point").removeClass("changing");
        });
    }
  }

  // Drag ellipse radius handles in only x or y direction
  if (type == "ellipse") {
    // We have already appended handles, now we will attach draggabilly to each of them
    for (var i = 0, len = handles.length; i < len; i++) {
      var handle = handles[i];

      // Restrict dragging if necessary
      // bar == "radius_x", "radius_y", "position"
      var bar = handle.classList[0];
      if (bar == "radius_x") {
        var axis = "x";
      }
      if (bar == "radius_y") {
        var axis = "y";
      }
      if (bar == "position") {
        var axis = "";
      }

      var draggie = new Draggabilly(handle, {
        containment: true,
        grid: grid,
        axis: axis
      })
        .on("dragStart", function(instance, e, pointer) {
          i = instance.element.dataset.handle;
          bar = instance.element.classList[0];

          // .changing triggers the bubble burst animation
          $point = $('[data-point="' + i + '"]');
          $point.addClass("changing");

          $position = $(".position");
          $radius_x = $(".radius_x");
          $radius_y = $(".radius_y");

          start_x_px = instance.position.x;
          start_y_px = instance.position.y;

          start_pos_x = $position.position().left;
          start_pos_x_pct = (start_pos_x * 100) / width;
          start_pos_y = $position.position().top;
          start_pos_y_pct = (start_pos_y * 100) / height;

          if (bar == "position") {
            start_radius_x_px = [
              $radius_x.position().left,
              $radius_x.position().top
            ];
            start_radius_y_px = [
              $radius_y.position().left,
              $radius_y.position().top
            ];

            var radius_x_point = $('.unprefixed [data-point="0"]').text();
            radius_x_pct = parseInt(radius_x_point.replace("%", ""));

            var radius_y_point = $('.unprefixed [data-point="1"]').text();
            radius_y_pct = parseInt(radius_y_point.replace("%", ""));

            var position_point = $('.unprefixed [data-point="2"]').text();
            var position_pct_array = position_point.replace("%", "").split(" ");
            var position_x_pct = parseInt(position_pct_array[0]);
            var position_y_pct = parseInt(position_pct_array[1]);
          }
        })
        .on("dragMove", function(instance, e, pointer) {
          // Handle position
          var x = instance.position.x;
          var y = instance.position.y;

          // snap to edges
          var snap = 1;

          if (bar == "radius_x") {
            // Set % from center center position as absolute number
            var x_pct = Math.floor((Math.abs(start_pos_x - x) / width) * 100);
            var x_pct = x_pct + "%";

            $point.text(x_pct);
          }
          if (bar == "radius_y") {
            // Set % from center center position as absolute number
            var y_pct = Math.floor((Math.abs(start_pos_y - y) / height) * 100);
            var y_pct = y_pct + "%";

            $point.text(y_pct);
          }

          if (bar == "position") {
            var move_x = start_x_px - x;
            var move_y = start_y_px - y;

            // Set new positions of radius handles
            var move_radius_x_x_px = start_radius_x_px[0] - move_x;
            var move_radius_x_y_px = start_radius_x_px[1] - move_y;
            var move_radius_y_x_px = start_radius_y_px[0] - move_x;
            var move_radius_y_y_px = start_radius_y_px[1] - move_y;

            // Prevent handle overflow
            var alt_x_px = x - (radius_x_pct / 100) * width;
            var alt_y_px = y + (radius_y_pct / 100) * height;

            console.log("alt_x_px" + alt_x_px);
            console.log("alt_y_px" + alt_y_px);

            if (move_radius_x_x_px > width && alt_x_px > 0) {
              var move_radius_x_x_px = alt_x_px;
            }
            if (move_radius_x_x_px > width) {
              var move_radius_x_x_px = width;
            }
            /*
          if(move_radius_y_y_px < 0 && (alt_y_px < height)) {
            var move_radius_y_y_px = alt_y_px;
            var move_radius_y_y_px = move_radius_y_y_px;
          }
          if(move_radius_y_y_px < 0) {
            var move_radius_y_y_px = 0;
            var move_radius_y_y_px = move_radius_y_y_px;
          }
          */

            // Move the handles
            $radius_x.css({
              left: move_radius_x_x_px + "px",
              top: move_radius_x_y_px + "px"
            });
            $radius_y.css({
              left: move_radius_y_x_px + "px",
              top: move_radius_y_y_px + "px"
            });

            // Set position of position handle
            var x_pct = Math.floor((x / width) * 100) + "%";
            var y_pct = Math.floor((y / height) * 100) + "%";

            $point.text(x_pct + " " + y_pct);
          }

          clipIt();
        })
        .on("dragEnd", function(instance, e, pointer) {
          // Remove all the bubble animations
          $(".point").removeClass("changing");
        });
    }
  }

  // We need to use a different draggabilly setup to drag size elements in only x or only y direction
  if (type == "inset") {
    // We have already appended handles, now we will attach draggabilly to each of them
    for (var i = 0, len = handles.length; i < len; i++) {
      var handle = handles[i];

      // bar == "top", "right", "bottom", or "left"
      var bar = handle.classList[1];

      if (bar == "left" || bar == "right") {
        axis = "x";
      }
      if (bar == "top" || bar == "bottom") {
        axis = "y";
      }

      var draggie = new Draggabilly(handle, {
        containment: true,
        grid: grid,
        axis: axis
      })
        .on("dragStart", function(instance, e, pointer) {
          i = instance.element.dataset.handle;
          bar = instance.element.classList[1];

          // We have to do this again for some reason, look to remove in the future
          if (bar == "left" || bar == "right") {
            axis = "x";
          }
          if (bar == "top" || bar == "bottom") {
            axis = "y";
          }

          // .changing triggers the bubble burst animation
          $point = $('[data-point="' + i + '"]');
          $point.addClass("changing");
        })
        .on("dragMove", function(instance, e, pointer) {
          // Handle position
          var x = instance.position.x;
          var y = instance.position.y;

          // snap to edges
          var snap = 1;

          var x = ((x / width) * 100).toFixed(0);
          if (x < snap) {
            var x = 0;
          }
          if (x > 100 - snap) {
            var x = 100;
          }
          var y = ((y / height) * 100).toFixed(0);
          if (y < snap) {
            var y = 0;
          }
          if (y > 100 - snap) {
            var y = 100;
          }

          // inset() uses absolute numbers from edges
          if (bar == "right") {
            var x = Math.abs(100 - x);
          }
          if (bar == "bottom") {
            var y = Math.abs(100 - y);
          }

          // Hacky way to get and store the current coordinates displayed in CSS
          var coords = $unprefixed
            .text()
            .match(/inset(.*?)\)/g)
            .toString();
          var coords = coords
            .replace("inset(", "")
            .replace(")", "")
            .replace(/%/g, "");
          $unprefixed.attr("data-coords", coords);

          /*
        // Use only two or one shape argument if possible
        var coords = coords.split(" ");
        if(coords[0] == coords[2] && coords[1] == coords[3]) {
          $clip_path.addClass("two-match");
        } else {
          $clip_path.removeClass("two-match");
        }
        if(coords[0] == coords[1] == coords[2] == coords[3]) {
          $clip_path.addClass("four-match");
        } else {
          $clip_path.removeClass("four-match");
        }
        */

          // Add % if number is not zero
          if (x !== 0) {
            var x = x + "%";
          }
          if (y !== 0) {
            var y = y + "%";
          }

          if (axis == "x") {
            $point.text(x);
          }
          if (axis == "y") {
            $point.text(y);
          }

          setHandleBars(bar);

          clipIt();
        })
        .on("dragEnd", function(instance, e, pointer) {
          // Remove all the bubble animations
          $(".point").removeClass("changing");
        });
    }
  }
}