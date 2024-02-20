function defaultZoom(graph, svg) {
  return d3.behavior.zoom().on('zoom', function() {
    svg.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
  });
}