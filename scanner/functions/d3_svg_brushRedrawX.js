function d3_svg_brushRedrawX(g, extent) {
  g.select(".extent").attr("x", extent[0][0]);
  g.selectAll(".n,.s,.w,.nw,.sw").attr("x", extent[0][0] - 2);
  g.selectAll(".e,.ne,.se").attr("x", extent[1][0] - 3);
  g.selectAll(".extent,.n,.s").attr("width", extent[1][0] - extent[0][0]);
}