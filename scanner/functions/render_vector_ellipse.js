function render_vector_ellipse(xr, yr, offset) {
  svg = "<ellipse cx="+(xr+offset)+" cy="+(yr+offset)+" rx="+xr+" ry="+yr+">";

  return svg;
}