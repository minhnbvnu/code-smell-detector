function transformArc(arc, scale, translate) {
  let x = 0;
  let y = 0;
  for (let i = 0, ii = arc.length; i < ii; ++i) {
    const vertex = arc[i];
    x += vertex[0];
    y += vertex[1];
    vertex[0] = x;
    vertex[1] = y;
    transformVertex(vertex, scale, translate);
  }
}