function getOrMakeArrowhead(root, id) {
  var search = root.select('#' + id);
  if (!search.empty()) { return search; }

  var defs = root.select('defs');
  if (defs.empty()) {
    defs = root.append('svg:defs');
  }

  var marker =
    defs
      .append('svg:marker')
        .attr('id', id)
        .attr('viewBox', '0 0 10 10')
        .attr('refX', 8)
        .attr('refY', 5)
        .attr('markerUnits', 'strokeWidth')
        .attr('markerWidth', 8)
        .attr('markerHeight', 5)
        .attr('orient', 'auto');

  marker
    .append('svg:path')
      .attr('d', 'M 0 0 L 10 5 L 0 10 z');

  return marker;
}