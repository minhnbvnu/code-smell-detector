function setupDemo(coords) {
  console.log("setupDemo();");

  clearDemo();

  start_flickity();

  if (type == "custom") {
    // Prepare for customizing
    $html.addClass("customizing start-customizing customizing-no-poly");
    $handles.empty();
    $functions.html('polygon(<span class="function"></span>)');

    // Close customization if finish button is clicked
    $(".finish").click(function() {
      finishCustomizing();
      readyDrag();
    });

    clipIt();

    var i = 0;
    $demo.click(function(e) {
      i++;

      // Get where on demo the click is
      var offset = $(this).offset();
      var x_px = e.pageX - offset.left - 10;
      var y_px = e.pageY - offset.top - 10;

      // Keep clicks in bounds
      if (x_px < 0) {
        var x_px = 0;
      }
      if (x_px > width) {
        var x_px = width;
      }
      if (y_px < 0) {
        var y_px = 0;
      }
      if (y_px > height) {
        var y_px = height;
      }

      // Convert px to % coordinates
      var code_x = Math.round((x_px / width) * 100) + "%";
      var code_y = Math.round((y_px / height) * 100) + "%";

      // Add the handle
      $handles.append(
        '<div class="handle" data-handle="' +
          i +
          '" style="top: ' +
          y_px +
          "px; left: " +
          x_px +
          'px;"></div>'
      );

      // Add css point and detect if comma is necessary
      var $functions = $(".function", $functions);
      if (i > 1) {
        // comma
        $functions.append(
          ', <code class="point" data-point="' +
            i +
            '">' +
            code_x +
            " " +
            code_y +
            "</code>"
        );
      } else {
        // no comma
        $functions.append(
          '<code class="point" data-point="' +
            i +
            '">' +
            code_x +
            " " +
            code_y +
            "</code>"
        );
        $html.removeClass("start-customizing");
      }

      if (i > 2) {
        // We have at least 3 points and a polygon
        // Tell the person the name of the shape they made for fun
        var shapes = [
          "triangle",
          "quadrilateral",
          "pentagon",
          "hexagon",
          "heptagon",
          "octagon",
          "nonagon",
          "decagon",
          "hendecagon",
          "dodecagon",
          "tridecagon",
          "tetradecagon",
          "pentadecagon",
          "hexadecagon",
          "heptadecagon",
          "octadecagon",
          "nonadecagon",
          "icosagon",
          "icosagon",
          "icosikaihenagon",
          "icosikaidigon",
          "icosikaitrigon",
          "icosikaitetragon",
          "icosikaipentagon",
          "icosikaihexagon",
          "icosikaiheptagon",
          "icosikaioctagon",
          "icosikaienneagon",
          "triacontagon",
          "triacontakaihenagon",
          "triacontakaidigon",
          "triacontakaitrigon",
          "triacontakaitetragon",
          "triacontakaipentagon",
          "triacontakaihexagon",
          "triacontakaiheptagon",
          "triacontakaioctagon",
          "triacontakaienneagon",
          "tetracontagon",
          "tetracontakaihenagon",
          "tetracontakaidigon",
          "tetracontakaitrigon",
          "tetracontakaitetragon",
          "tetracontakaipentagon",
          "tetracontakaihexagon",
          "tetracontakaiheptagon",
          "tetracontakaioctagon",
          "tetracontakaienneagon",
          "pentacontagon",
          "pentacontakaihenagon",
          "pentacontakaidigon",
          "pentacontakaitrigon",
          "pentacontakaitetragon",
          "pentacontakaipentagon",
          "pentacontakaihexagon",
          "pentacontakaiheptagon",
          "pentacontakaioctagon",
          "pentacontakaienneagon",
          "hexacontagon",
          "hexacontakaihenagon",
          "hexacontakaidigon",
          "hexacontakaitrigon",
          "hexacontakaitetragon",
          "hexacontakaipentagon",
          "hexacontakaihexagon",
          "hexacontakaiheptagon",
          "hexacontakaioctagon",
          "hexacontakaienneagon",
          "heptacontagon",
          "heptacontakaihenagon",
          "heptacontakaidigon",
          "heptacontakaitrigon",
          "heptacontakaitetragon",
          "heptacontakaipentagon",
          "heptacontakaihexagon",
          "heptacontakaiheptagon",
          "heptacontakaioctagon",
          "heptacontakaienneagon",
          "octacontagon",
          "octacontakaihenagon",
          "octacontakaidigon",
          "octacontakaitrigon",
          "octacontakaitetragon",
          "octacontakaipentagon",
          "octacontakaihexagon",
          "octacontakaiheptagon",
          "octacontakaioctagon",
          "octacontakaienneagon",
          "enneacontagon",
          "enneacontakaihenagon",
          "enneacontakaidigon",
          "enneacontakaitrigon",
          "enneacontakaitetragon",
          "enneacontakaipentagon",
          "enneacontakaihexagon",
          "enneacontakaiheptagon",
          "enneacontakaioctagon",
          "enneacontakaienneagon",
          "hectogon"
        ];

        $(".finish").attr("data-shape", shapes[i - 3]);

        $html.removeClass("customizing-no-poly");
        clipIt();

        // End adding new points if first handle is clicked
        $('[data-handle="1"]').click(function() {
          finishCustomizing();
          readyDrag();
        });
      }
    });
  } else {
    finishCustomizing();

    // Run through each coordinate for polygons, circles, ellipses, and inset
    $.each(coords, function(i, coord) {
      var x = coord[0];
      var y = coord[1];

      // Add unit to % coordinates
      var code_x = x + "%";
      var code_y = y + "%";

      // Convert % to px coordinates
      var x_px = Math.round((x / 100) * width);
      var y_px = Math.round((y / 100) * height);

      console.log("type: " + type);

      // Setup Circle demo
      if (type == "circle") {
        // Grab preset values
        var shape = shape_array.circle[0];
        var radius = shape.radius; // For 1:1 ratio

        // Adjust radius handle to edge of circle if ratio is not 1:1
        if (width !== height) {
          var radius_x_px = width * getRadiusModifier();
        } else {
          var radius_x_px = width;
        }

        // Setup radius handle
        if (i == 0) {
          $handles.append(
            '<div class="radius handle" data-handle="' +
              i +
              '" style="top: ' +
              y_px +
              "px; left: " +
              radius_x_px +
              'px;"></div>'
          );
        }

        // Setup center position handle
        if (i == 1) {
          $handles.append(
            '<div class="position handle" data-handle="' +
              i +
              '" style="top: ' +
              y_px +
              "px; left: " +
              x_px +
              'px;"></div>'
          );
        }

        var position_x = shape.position[0];
        var position_y = shape.position[1];

        // Add % units to preset values
        var radius = radius + "%";
        var position_x = position_x + "%";
        var position_y = position_y + "%";

        if (i == coords.length - 1) {
          var radius =
            '<code class="point radius" data-point="0">' + radius + "</code>";
          var position =
            '<code class="point position" data-point="1">' +
            position_x +
            " " +
            position_y +
            "</code>";

          var clip_path_function = "circle(" + radius + " at " + position + ")";
          $functions.append(clip_path_function);

          clipIt();
          readyDrag();
        }
      }

      // Setup ellipse demo
      if (type == "ellipse") {
        // Grab preset values
        var shape = shape_array.ellipse[0];
        var position = shape.position;
        var position_x_px = (position[0] / 100) * width;
        var position_y_px = (position[1] / 100) * height;

        var radius = shape.radius;
        var radius_x_px = (1 - radius[0] / 100) * width;
        var radius_y_px = ((radius[1] / 2 / 100) * height) / 2;

        // Setup ellipse radius handles
        if (i == 0) {
          $handles.append(
            '<div class="radius_x handle" data-handle="' +
              i +
              '" style="top: ' +
              y_px +
              "px; left: " +
              radius_x_px +
              'px;"></div>'
          );
        }
        if (i == 1) {
          $handles.append(
            '<div class="radius_y handle" data-handle="' +
              i +
              '" style="top: ' +
              radius_y_px +
              "px; left: " +
              position_x_px +
              'px;"></div>'
          );
        }

        // Setup center position handle
        if (i == 2) {
          $handles.append(
            '<div class="position handle" data-handle="' +
              i +
              '" style="top: ' +
              position_y_px +
              "px; left: " +
              position_x_px +
              'px;"></div>'
          );
        }

        // Add % units to preset values
        var radius_x = radius[0] + "%";
        var radius_y = radius[1] + "%";
        var position_x = shape.position[0] + "%";
        var position_y = shape.position[1] + "%";

        if (i == coords.length - 1) {
          var radius_x =
            '<code class="point radius" data-point="0">' + radius_x + "</code>";
          var radius_y =
            '<code class="point radius" data-point="1">' + radius_y + "</code>";
          var position =
            '<code class="point position" data-point="2">' +
            position_x +
            " " +
            position_y +
            "</code>";

          var clip_path_function =
            "ellipse(" + radius_x + " " + radius_y + " at " + position + ")";
          $functions.append(clip_path_function);

          clipIt();
          readyDrag();
        }
      }

      if (type == "polygon") {
        $handles.append(
          '<div class="handle" data-handle="' +
            i +
            '" style="top: ' +
            y_px +
            "px; left: " +
            x_px +
            'px;"></div>'
        );

        if (i == coords.length - 1) {
          $functions.append(
            '<code class="point" data-point="' +
              i +
              '">' +
              code_x +
              " " +
              code_y +
              "</code>"
          );
          $functions.prepend("polygon(").append(")");

          clipIt();
          readyDrag();
        } else {
          $functions.append(
            '<code class="point" data-point="' +
              i +
              '">' +
              code_x +
              " " +
              code_y +
              "</code>, "
          );
        }
      }

      if (type == "inset") {
        $html.addClass("insetting");

        if (i == coords.length - 1) {
          $handles.append(
            '<div class="handle top horizontal bar" data-handle="0"></div>'
          );
          $handles.append(
            '<div class="handle right vertical bar" data-handle="1"></div>'
          );
          $handles.append(
            '<div class="handle bottom horizontal bar" data-handle="2"></div>'
          );
          $handles.append(
            '<div class="handle left vertical bar" data-handle="3"></div>'
          );

          $unprefixed.attr(
            "data-coords",
            coords[0] + " " + coords[1] + " " + coords[2] + " " + coords[3]
          );

          setHandleBars();

          var top_point =
            '<code class="point" data-point="0">' + coords[0] + "%</code> ";
          var right_point =
            '<code class="point" data-point="1">' + coords[1] + "%</code> ";
          var bottom_point =
            '<code class="point" data-point="2">' + coords[2] + "%</code> ";
          var left_point =
            '<code class="point" data-point="3">' + coords[3] + "%</code>";

          var clip_path_function =
            "inset(" +
            top_point +
            right_point +
            bottom_point +
            left_point +
            '<span class="round-value"></span>)';
          $functions.append(clip_path_function);

          clipIt();
          readyDrag();
        }
      }
    });
  }
}