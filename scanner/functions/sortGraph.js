function sortGraph(vertexes, edges) {
  const l = []; // Empty list that will contain the sorted elements
  let s = findVertexesWithNoIncomingEdges(vertexes, edges);
  let edgesLeft = makeEdgesSet(edges);

  const excludeEdgesFrom = n => m => {
    edgesLeft = dissocEdge(n, m, edgesLeft);
    if (!hasIncomingEdges(m, edgesLeft)) {
      s.push(m);
    }
  };

  while (s.length) {
    const [n, ...restS] = s;
    s = restS;
    l.push(n);

    R.forEach(
      excludeEdgesFrom(n),
      R.filter(hasEdgeFrom(n, edgesLeft), vertexes)
    );
  }

  if (!R.isEmpty(edgesLeft)) {
    return fail('LOOPS_DETECTED', {});
  }

  return Either.of(l);
}