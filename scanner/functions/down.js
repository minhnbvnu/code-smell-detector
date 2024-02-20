function down() {
    var target = d3.select(d3.event.target);

    // Store some global state for the duration of the brush gesture.
    d3_svg_brush = brush;
    d3_svg_brushTarget = this;
    d3_svg_brushExtent = extent;
    d3_svg_brushOffset = d3.svg.mouse(d3_svg_brushTarget);

    // If the extent was clicked on, drag rather than brush;
    // store the offset between the mouse and extent origin instead.
    if (d3_svg_brushDrag = target.classed("extent")) {
      d3_svg_brushOffset[0] = extent[0][0] - d3_svg_brushOffset[0];
      d3_svg_brushOffset[1] = extent[0][1] - d3_svg_brushOffset[1];
    }

    // If a resizer was clicked on, record which side is to be resized.
    // Also, set the offset to the opposite side.
    else if (target.classed("resize")) {
      d3_svg_brushResize = d3.event.target.__data__;
      d3_svg_brushOffset[0] = extent[+/w$/.test(d3_svg_brushResize)][0];
      d3_svg_brushOffset[1] = extent[+/^n/.test(d3_svg_brushResize)][1];
    }

    // If the ALT key is down when starting a brush, the center is at the mouse.
    else if (d3.event.altKey) {
      d3_svg_brushCenter = d3_svg_brushOffset.slice();
    }

    // Restrict which dimensions are resized.
    d3_svg_brushX = !/^(n|s)$/.test(d3_svg_brushResize) && x;
    d3_svg_brushY = !/^(e|w)$/.test(d3_svg_brushResize) && y;

    // Notify listeners.
    d3_svg_brushDispatch = dispatcher(this, arguments);
    d3_svg_brushDispatch("brushstart");
    d3_svg_brushMove();
    d3_eventCancel();
  }