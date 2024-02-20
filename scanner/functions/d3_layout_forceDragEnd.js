function d3_layout_forceDragEnd() {
  d3_layout_forceDrag();
  d3_layout_forceDragNode.fixed &= 1;
  d3_layout_forceDragForce = d3_layout_forceDragNode = null;
}