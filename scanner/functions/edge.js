function edge(a, b) {
  const u = indices[a];
  const v = indices[b];
  let key = (u < v) ? `${u}%${v}` : `${v}%${u}`;
  if (!edges.has(key)) {
    const [x1, y1, z1] = icosahedronCoords(a);
    const [x2, y2, z2] = icosahedronCoords(b);
    cylinder(x1, y1, z1, x2, y2, z2);
    edges.set(key, true);
  }
}