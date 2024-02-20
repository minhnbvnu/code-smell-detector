function d3_svg_brushKeydown() {
  if (d3.event.keyCode == 32 && d3_svg_brushTarget && !d3_svg_brushDrag) {
    d3_svg_brushCenter = null;
    d3_svg_brushOffset[0] -= d3_svg_brushExtent[1][0];
    d3_svg_brushOffset[1] -= d3_svg_brushExtent[1][1];
    d3_svg_brushDrag = 2;
    d3_eventCancel();
  }
}