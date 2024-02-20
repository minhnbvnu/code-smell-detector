function decodeType4Shading(mesh, reader) {
    var coords = mesh.coords;
    var colors = mesh.colors;
    var operators = [];
    var ps = []; // not maintaining cs since that will match ps
    var verticesLeft = 0; // assuming we have all data to start a new triangle
    while (reader.hasData) {
      var f = reader.readFlag();
      var coord = reader.readCoordinate();
      var color = reader.readComponents();
      if (verticesLeft === 0) { // ignoring flags if we started a triangle
        assert(0 <= f && f <= 2, 'Unknown type4 flag');
        switch (f) {
          case 0:
            verticesLeft = 3;
            break;
          case 1:
            ps.push(ps[ps.length - 2], ps[ps.length - 1]);
            verticesLeft = 1;
            break;
          case 2:
            ps.push(ps[ps.length - 3], ps[ps.length - 1]);
            verticesLeft = 1;
            break;
        }
        operators.push(f);
      }
      ps.push(coords.length);
      coords.push(coord);
      colors.push(color);
      verticesLeft--;

      reader.align();
    }

    var psPacked = new Int32Array(ps);

    mesh.figures.push({
      type: 'triangles',
      coords: psPacked,
      colors: psPacked
    });
  }