function defaultPostRender(graph, root) {
  if (graph.isDirected()) {
    // Fill = #333 is for backwards compatibility
    getOrMakeArrowhead(root, 'arrowhead')
      .attr('fill', '#333');
  }
}