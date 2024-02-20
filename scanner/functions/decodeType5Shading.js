function decodeType5Shading(mesh, reader, verticesPerRow) {
    var coords = mesh.coords;
    var colors = mesh.colors;
    var ps = []; // not maintaining cs since that will match ps
    while (reader.hasData) {
      var coord = reader.readCoordinate();
      var color = reader.readComponents();
      ps.push(coords.length);
      coords.push(coord);
      colors.push(color);
    }

    var psPacked = new Int32Array(ps);

    mesh.figures.push({
      type: 'lattice',
      coords: psPacked,
      colors: psPacked,
      verticesPerRow: verticesPerRow
    });
  }