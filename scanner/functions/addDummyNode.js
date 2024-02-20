function addDummyNode(g, e, u, v, a, index, isLabel) {
  return g.addNode(null, {
    width: isLabel ? a.width : 0,
    height: isLabel ? a.height : 0,
    edge: { id: e, source: u, target: v, attrs: a },
    dummy: true,
    index: index
  });
}