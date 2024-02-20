function defaultZoomSetup(graph, svg) {
  var root = svg.property('ownerSVGElement');
  // If the svg node is the root, we get null, so set to svg.
  if (!root) {
    root = svg;
  } else {
    root = d3.select(root);
  }

  if (root.select('rect.overlay').empty()) {
    // Create an overlay for capturing mouse events that don't touch foreground
    var overlay = root.append('rect')
      .attr('class', 'overlay')
      .attr('width', '100%')
      .attr('height', '100%')
      .style('fill', 'none')
      .style('pointer-events', 'all');

    // Capture the zoom behaviour from the svg
    svg = svg.append('g')
      .attr('class', 'zoom');

    if (this._zoom) {
      overlay.call(this._zoom(graph, svg));
    }
  }

  return svg;
}