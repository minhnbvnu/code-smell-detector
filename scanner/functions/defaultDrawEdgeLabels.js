function defaultDrawEdgeLabels(g, root) {
  var svgEdgeLabels = root
    .selectAll('g.edgeLabel')
    .classed('enter', false)
    .data(g.edges(), function (e) { return e; });

  svgEdgeLabels.selectAll('*').remove();

  svgEdgeLabels
    .enter()
      .append('g')
        .style('opacity', 0)
        .attr('class', 'edgeLabel enter');

  svgEdgeLabels.each(function(e) { addLabel(g.edge(e), d3.select(this), false, 0, 0); });

  this._transition(svgEdgeLabels.exit())
      .style('opacity', 0)
      .remove();

  return svgEdgeLabels;
}