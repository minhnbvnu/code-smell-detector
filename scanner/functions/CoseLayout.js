function CoseLayout( options ){
  this.options = util.extend( {}, defaults, options );
  this.options.layout = this;

  // Exclude any edge that has a source or target node that is not in the set of passed-in nodes
  const nodes = this.options.eles.nodes();
  const edges = this.options.eles.edges();
  const notEdges = edges.filter((e) => {
    const sourceId = e.source().data('id');
    const targetId = e.target().data('id');
    const hasSource = nodes.some((n) => n.data('id') === sourceId);
    const hasTarget = nodes.some((n) => n.data('id') === targetId);
    return !hasSource || !hasTarget;
  });
  this.options.eles = this.options.eles.not(notEdges);
}