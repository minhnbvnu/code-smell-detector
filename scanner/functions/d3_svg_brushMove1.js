function d3_svg_brushMove1(mouse, scale, i) {
  var range = d3_scaleRange(scale),
      r0 = range[0],
      r1 = range[1],
      offset = d3_svg_brushOffset[i],
      size = d3_svg_brushExtent[1][i] - d3_svg_brushExtent[0][i],
      min,
      max;

  // When dragging, reduce the range by the extent size and offset.
  if (d3_svg_brushDrag) {
    r0 -= offset;
    r1 -= size + offset;
  }

  // Clamp the mouse so that the extent fits within the range extent.
  min = Math.max(r0, Math.min(r1, mouse[i]));

  // Compute the new extent bounds.
  if (d3_svg_brushDrag) {
    max = (min += offset) + size;
  } else {

    // If the ALT key is pressed, then preserve the center of the extent.
    if (d3_svg_brushCenter) offset = Math.max(r0, Math.min(r1, 2 * d3_svg_brushCenter[i] - min));

    // Compute the min and max of the offset and mouse.
    if (offset < min) {
      max = min;
      min = offset;
    } else {
      max = offset;
    }
  }

  // Update the stored bounds.
  d3_svg_brushExtent[0][i] = min;
  d3_svg_brushExtent[1][i] = max;
}