function transformArcs(arcs, scale, translate) {
  for (let i = 0, ii = arcs.length; i < ii; ++i) {
    transformArc(arcs[i], scale, translate);
  }
}