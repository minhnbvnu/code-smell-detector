function generateDodecahedron() {
  const r = 0.5;

  const phi = (1 + Math.sqrt(5)) / 2;
  const a = 0.5;
  const b = 0.5 * 1 / phi;
  const c = 0.5 * (2 - phi);

  const vertices = [
    c, 0, a,
    -c, 0, a,
    -b, b, b,
    0, a, c,
    b, b, b,
    b, -b, b,
    0, -a, c,
    -b, -b, b,
    c, 0, -a,
    -c, 0, -a,
    -b, -b, -b,
    0, -a, -c,
    b, -b, -b,
    b, b, -b,
    0, a, -c,
    -b, b, -b,
    a, c, 0,
    -a, c, 0,
    -a, -c, 0,
    a, -c, 0
  ];

  function coords(i) {
    const x = vertices[i * 3];
    const y = vertices[i * 3 + 1];
    const z = vertices[i * 3 + 2];
    return [x, y, z];
  }

  //vertices = vertices.map(function(v) { return v.normalize().scale(r); })

  const faces = [
    [4, 3, 2, 1, 0],
    [7, 6, 5, 0, 1],
    [12, 11, 10, 9, 8],
    [15, 14, 13, 8, 9],
    [14, 3, 4, 16, 13],
    [3, 14, 15, 17, 2],
    [11, 6, 7, 18, 10],
    [6, 11, 12, 19, 5],
    [4, 0, 5, 19, 16],
    [12, 8, 13, 16, 19],
    [15, 9, 10, 18, 17],
    [7, 1, 2, 17, 18]
  ];

  const edges = [
    [0, 1],
    [0, 4],
    [0, 5],
    [1, 2],
    [1, 7],
    [2, 3],
    [2, 17],
    [3, 4],
    [3, 14],
    [4, 16],
    [5, 6],
    [5, 19],
    [6, 7],
    [6, 11],
    [7, 18],
    [8, 9],
    [8, 12],
    [8, 13],
    [9, 10],
    [9, 15],
    [10, 11],
    [10, 18],
    [11, 12],
    [12, 19],
    [13, 14],
    [13, 16],
    [14, 15],
    [15, 17],
    [16, 19],
    [17, 18]
  ];

  meshOpen();

  for (let i = 0; i < vertices.length; i += 3) {
    node(vertices[i], vertices[i + 1], vertices[i + 2]);
  }

  for (const edge of edges) {
    cylinder(...coords(edge[0]), ...coords(edge[1]));
  }

  for (const face of faces) {
    const v = [...face.map(i => coords(i))];
    plane(v.flat());
  }

  return meshClose(0, 0, 0);
}