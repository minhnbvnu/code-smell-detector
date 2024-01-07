function packData(mesh) {
    let i, ii, j, jj;
    const coords = mesh.coords;
    const coordsPacked = new Float32Array(coords.length * 2);

    for (i = 0, j = 0, ii = coords.length; i < ii; i++) {
      const xy = coords[i];
      coordsPacked[j++] = xy[0];
      coordsPacked[j++] = xy[1];
    }

    mesh.coords = coordsPacked;
    const colors = mesh.colors;
    const colorsPacked = new Uint8Array(colors.length * 3);

    for (i = 0, j = 0, ii = colors.length; i < ii; i++) {
      const c = colors[i];
      colorsPacked[j++] = c[0];
      colorsPacked[j++] = c[1];
      colorsPacked[j++] = c[2];
    }

    mesh.colors = colorsPacked;
    const figures = mesh.figures;

    for (i = 0, ii = figures.length; i < ii; i++) {
      const figure = figures[i],
            ps = figure.coords,
            cs = figure.colors;

      for (j = 0, jj = ps.length; j < jj; j++) {
        ps[j] *= 2;
        cs[j] *= 3;
      }
    }
  }