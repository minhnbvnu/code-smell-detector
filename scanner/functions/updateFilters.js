function updateFilters(type, resource, prefix) {
  const cells = graph.getModel().cells;
  const keys = Object.keys(cells);
  keys.map(
    (p) =>
      (locationCache[cells[p].value] = cells[p].geometry
        ? { x: cells[p].geometry.x, y: cells[p].geometry.y }
        : null)
  );
  if (vertices.filter((p) => p.type === type).length) {
    const item = vertices.filter((p) => p.name === `${prefix}.${resource}`)[0];
    if (item) {
      graph.removeCells([item.vertex], true);
    }
    vertices = vertices.filter((p) => p.name != `${prefix}.${resource}`);
  }
}