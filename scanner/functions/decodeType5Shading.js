function decodeType5Shading(mesh, reader, verticesPerRow) {
    const coords = mesh.coords;
    const colors = mesh.colors;
    const ps = [];

    while (reader.hasData) {
      const coord = reader.readCoordinate();
      const color = reader.readComponents();
      ps.push(coords.length);
      coords.push(coord);
      colors.push(color);
    }

    mesh.figures.push({
      type: "lattice",
      coords: new Int32Array(ps),
      colors: new Int32Array(ps),
      verticesPerRow
    });
  }