function defaultPositionNodes(g, svgNodes) {
  function transform(u) {
    var value = g.node(u);
    return 'translate(' + value.x + ',' + value.y + ')';
  }

  // For entering nodes, position immediately without transition
  svgNodes.filter('.enter').attr('transform', transform);

  this._transition(svgNodes)
      .style('opacity', 1)
      .attr('transform', transform);
}