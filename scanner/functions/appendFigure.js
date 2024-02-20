function appendFigure(clip_path, shape) {
  // Add all the buttons to the .shapes container
  // considering using some other element other than figure for buttons to be more semantic...

  var webkit = "";
  var unprefixed = "clip-path: " + clip_path;

  // Disable the element if we are not ready for it to be enabled
  if (shape.disabled == true) {
    var disabled = 'class="disabled" ';
  } else {
    var disabled = "";
  }

  if ($(".webkit.block").hasClass("show")) {
    var webkit = "-webkit-clip-path: " + clip_path + ";";
  }

  if (type == "polygon") {
    var fig =
      '<figure class="gallery-cell" ' +
      disabled +
      'data-name="' +
      shape.name +
      '" data-type="polygon" data-coords="' +
      shape.coords.join(" ") +
      '">' +
      '<div style="' +
      webkit +
      " " +
      " " +
      unprefixed +
      '" class="shape ' +
      shape.name +
      '"></div>' +
      "<figcaption>" +
      shape.name +
      "</figcaption>" +
      "</figure>";
  }

  if (type == "custom") {
    var fig =
      '<figure class="gallery-cell" ' +
      disabled +
      'data-name="' +
      shape.name +
      '" data-type="custom" data-coords="' +
      shape.coords.join(" ") +
      '">' +
      '<div style="' +
      webkit +
      " " +
      " " +
      unprefixed +
      '" class="shape ' +
      shape.name +
      '"></div>' +
      "<figcaption>" +
      shape.name +
      "</figcaption>" +
      "</figure>";
  }

  if (type == "inset") {
    var fig =
      '<figure class="gallery-cell" ' +
      disabled +
      'data-name="' +
      shape.name +
      '" data-type="inset" data-coords="' +
      shape.coords.join(" ") +
      '">' +
      '<div style="' +
      webkit +
      " " +
      " " +
      unprefixed +
      '" class="shape ' +
      shape.name +
      '"></div>' +
      "<figcaption>" +
      shape.name +
      "</figcaption>" +
      "</figure>";
  }

  if (type == "circle") {
    var fig =
      '<figure class="gallery-cell" ' +
      disabled +
      'data-name="Circle" data-type="circle">' +
      '<div style="' +
      webkit +
      " " +
      " " +
      unprefixed +
      '" class="shape ' +
      shape.name +
      '"></div>' +
      "<figcaption>" +
      shape.name +
      "</figcaption>" +
      "</figure>";
  }

  if (type == "ellipse") {
    var fig =
      '<figure class="gallery-cell" ' +
      disabled +
      'data-name="Ellipse" data-type="ellipse">' +
      '<div style="' +
      webkit +
      " " +
      " " +
      unprefixed +
      '" class="shape ' +
      shape.name +
      '"></div>' +
      "<figcaption>" +
      shape.name +
      "</figcaption>" +
      "</figure>";
  }

  console.log("appendFigure();");
  $shapes.append(fig);

  // Add .on class to the figure we are starting with
  $('[data-name="' + start.name + '"]').addClass("on");

  // listen for clicks on the figure buttons
  $("figure:not(.disabled)")
    .unbind()
    .click(function() {
      $("figure").removeClass("on");
      $(this).addClass("on");

      type = $(this).attr("data-type");

      if (type == "inset") {
        var shape = shape_array.inset[0];
        start_coords = shape.coords;

        setupDemo(shape.coords);
      }

      if (type == "custom") {
        setupDemo();
      }

      if (type == "circle") {
        var shape = shape_array.circle[0];

        setupDemo(shape.coords);
      }

      if (type == "ellipse") {
        var shape = shape_array.ellipse[0];

        setupDemo(shape.coords);
      }

      if (type == "polygon") {
        new_shape = [];

        // Coords at stored with data-coords attribute and turned into array
        var coords = $(this)
          .attr("data-coords")
          .split(" ");

        var coords = $.each(coords, function(i, coordinate) {
          var coordinate = coordinate.split(",");
          new_shape.push(coordinate);

          if (i == coords.length - 1) {
            start_coords = new_shape;
            setupDemo(start_coords);
          }
        });
      }
    });
}