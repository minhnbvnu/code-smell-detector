function defaultDrawNodes(g, root) {
  var nodes = g.nodes().filter(function(u) { return !isComposite(g, u); });

  var svgNodes = root
    .selectAll('g.node')
    .classed('enter', false)
    .data(nodes, function(u) { return u; });

  svgNodes.selectAll('*').remove();

  svgNodes
    .enter()
      .append('g')
        .style('opacity', 0)
        .attr('class', 'node enter');

  svgNodes.each(function(u) {
    var attrs = g.node(u),
        domNode = d3.select(this);
    addLabel(attrs, domNode, true, 10, 10);
  });

  this._transition(svgNodes.exit())
      .style('opacity', 0)
      .remove();

  return svgNodes;
}