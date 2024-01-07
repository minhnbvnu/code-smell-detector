function sortTopologically(originalOrder, edgesById) {
  const sorted = [];
  const marked = new Set();

  function visit(id) {
    if (marked.has(id)) {
      // Either this node has already been placed, or we have encountered a
      // cycle and need to exit.
      return;
    }
    marked.add(id);
    const edges = edgesById.get(id);
    if (edges != null) {
      edges.forEach(visit);
    }
    sorted.push(id);
  }

  originalOrder.forEach(visit);
  return sorted;
}