function concatenateArcs(indices, arcs) {
  /** @type {Array<import("../coordinate.js").Coordinate>} */
  const coordinates = [];
  let index;
  for (let i = 0, ii = indices.length; i < ii; ++i) {
    index = indices[i];
    if (i > 0) {
      // splicing together arcs, discard last point
      coordinates.pop();
    }
    if (index >= 0) {
      // forward arc
      const arc = arcs[index];
      for (let j = 0, jj = arc.length; j < jj; ++j) {
        coordinates.push(arc[j].slice(0));
      }
    } else {
      // reverse arc
      const arc = arcs[~index];
      for (let j = arc.length - 1; j >= 0; --j) {
        coordinates.push(arc[j].slice(0));
      }
    }
  }
  return coordinates;
}