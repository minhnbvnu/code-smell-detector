function d3_svg_areaY(points) {
  return function(d, i) {
    return points[i][1];
  };
}